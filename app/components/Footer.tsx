"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";
import { personal, navItems } from "../lib/data";
import { goToSection, setHash, isSectionHash, hashToId } from "../lib/scroll";

/* ------------------------------------------------------------------ *
 * Theme helper — track the `dark` class Windsurf/ThemeToggle toggles
 * on <html>, so the WebGL dot colours stay in sync with the site.
 * ------------------------------------------------------------------ */
function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setIsDark(root.classList.contains("dark"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/* ------------------------------------------------------------------ *
 * WebGL dot-matrix reveal shader (adapted from the reference).
 * ------------------------------------------------------------------ */
type Uniforms = {
  [key: string]: {
    value: number[] | number[][] | number;
    type: string;
  };
};

type MouseRef = React.MutableRefObject<[number, number]>;
type HoverRef = React.MutableRefObject<number>;

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
  mouseRef?: MouseRef;
  hoverRef?: HoverRef;
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
  mouseRef,
  hoverRef,
}) => {
  const uniforms = useMemo(() => {
    let colorsArray = [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]];
    if (colors.length === 2) {
      colorsArray = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    } else if (colors.length === 3) {
      colorsArray = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
    }

    return {
      u_colors: {
        value: colorsArray.map((color) => [color[0] / 255, color[1] / 255, color[2] / 255]),
        type: "uniform3fv",
      },
      u_opacities: { value: opacities, type: "uniform1fv" },
      u_total_size: { value: totalSize, type: "uniform1f" },
      u_dot_size: { value: dotSize, type: "uniform1f" },
      u_mouse: { value: [0, 0], type: "uniform2f" },
      u_hover: { value: 0, type: "uniform1f" },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return (
    <Shader
      source={`
        precision mediump float;
        in vec2 fragCoord;

        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_hover;
        out vec4 fragColor;
        float PHI = 1.61803398874989484820459;
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        void main() {
            vec2 st = fragCoord.xy;
            ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));" : ""}
            ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));" : ""}
      float opacity = step(0.0, st.x);
      opacity *= step(0.0, st.y);

      vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

      float frequency = 5.0;
      float show_offset = random(st2);
      float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
      opacity *= u_opacities[int(rand * 10.0)];
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
      opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

      vec3 color = u_colors[int(show_offset * 6.0)];

      ${shader}

      fragColor = vec4(color, opacity);
      fragColor.rgb *= fragColor.a;
        }`}
      uniforms={uniforms}
      maxFps={60}
      mouseRef={mouseRef}
      hoverRef={hoverRef}
    />
  );
};

const ShaderMaterial = ({
  source,
  uniforms,
  maxFps = 60,
  mouseRef,
  hoverRef,
}: {
  source: string;
  maxFps?: number;
  uniforms: Uniforms;
  mouseRef?: MouseRef;
  hoverRef?: HoverRef;
}) => {
  const { size } = useThree();
  const ref = useRef<THREE.Mesh>(null);
  const lastFrameTime = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();
    if (timestamp - lastFrameTime.current < 1 / maxFps) return;
    lastFrameTime.current = timestamp;
    const material = ref.current.material as THREE.ShaderMaterial;
    material.uniforms.u_time.value = timestamp;

    // Live-update mouse + hover uniforms (no material rebuild → no flicker).
    if (mouseRef && material.uniforms.u_mouse) {
      (material.uniforms.u_mouse.value as THREE.Vector2).set(
        mouseRef.current[0],
        mouseRef.current[1]
      );
    }
    if (hoverRef && material.uniforms.u_hover) {
      const current = material.uniforms.u_hover.value as number;
      const target = hoverRef.current;
      material.uniforms.u_hover.value =
        current + (target - current) * Math.min(1, delta * 6);
    }
  });

  const getUniforms = () => {
    const preparedUniforms: Record<string, { value: unknown; type?: string }> = {};

    for (const uniformName in uniforms) {
      const uniform = uniforms[uniformName];

      switch (uniform.type) {
        case "uniform1f":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1f" };
          break;
        case "uniform1fv":
          preparedUniforms[uniformName] = { value: uniform.value, type: "1fv" };
          break;
        case "uniform2f":
          preparedUniforms[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value as number[]),
            type: "2f",
          };
          break;
        case "uniform3fv":
          preparedUniforms[uniformName] = {
            value: (uniform.value as number[][]).map((v) => new THREE.Vector3().fromArray(v)),
            type: "3fv",
          };
          break;
        default:
          break;
      }
    }

    preparedUniforms["u_time"] = { value: 0, type: "1f" };
    preparedUniforms["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    };
    return preparedUniforms;
  };

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
      precision mediump float;
      in vec2 coordinates;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main(){
        float x = position.x;
        float y = position.y;
        gl_Position = vec4(x, y, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
      `,
      fragmentShader: source,
      uniforms: getUniforms(),
      glslVersion: THREE.GLSL3,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height, source]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shader = ({
  source,
  uniforms,
  maxFps = 60,
  mouseRef,
  hoverRef,
}: {
  source: string;
  uniforms: Uniforms;
  maxFps?: number;
  mouseRef?: MouseRef;
  hoverRef?: HoverRef;
}) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full" gl={{ antialias: true, alpha: true }}>
      <ShaderMaterial
        source={source}
        uniforms={uniforms}
        maxFps={maxFps}
        mouseRef={mouseRef}
        hoverRef={hoverRef}
      />
    </Canvas>
  );
};

const CanvasRevealEffect = ({
  animationSpeed = 5,
  colors = [[195, 228, 29]],
  containerClassName,
  dotSize = 3,
  isDark = true,
}: {
  animationSpeed?: number;
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  isDark?: boolean;
}) => {
  const mouseRef = useRef<[number, number]>([0, 0]);
  const hoverRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = [
      (e.clientX - rect.left) / rect.width,
      (e.clientY - rect.top) / rect.height,
    ];
  }, []);

  // Stable shader source — mouse/hover come in through uniforms, so the
  // ShaderMaterial is built once and never rebuilt on hover (no flicker).
  const shaderSource = useMemo(
    () => `
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
              opacity *= step(intro_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);

              float hoverFactor = u_hover;

              vec2 mousePos = u_mouse * u_resolution / u_total_size;
              float distToMouse = distance(st2, mousePos);

              float hoverRadius = 150.0;
              if (distToMouse < hoverRadius) {
                float colorFactor = smoothstep(hoverRadius, 0.0, distToMouse) * hoverFactor;
                vec3 hoverColor = u_colors[int(mod(random(st2) * 10.0, 6.0))];
                hoverColor = clamp(hoverColor * 1.5, vec3(0.0), vec3(1.0));
                color = mix(color, hoverColor, colorFactor * 0.9);
                opacity = mix(opacity, min(opacity * 1.5, 1.0), colorFactor * 0.7);
              }
            `,
    [animationSpeed]
  );

  return (
    <div
      className={cn("h-full relative w-full", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => (hoverRef.current = 1)}
      onMouseLeave={() => (hoverRef.current = 0)}
    >
      <div className="h-full w-full">
        <DotMatrix
          colors={colors}
          dotSize={dotSize}
          opacities={[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
          shader={shaderSource}
          center={["x", "y"]}
          mouseRef={mouseRef}
          hoverRef={hoverRef}
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t to-transparent to-[84%]",
          isDark ? "from-black" : "from-white"
        )}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * Text / link micro-interactions.
 * ------------------------------------------------------------------ */
const ShinyText = ({
  children,
  isShining = false,
  speed = 1,
  className = "",
}: {
  children?: React.ReactNode;
  isShining?: boolean;
  speed?: number;
  className?: string;
}) => (
  <span
    className={cn("text-inherit bg-clip-text inline-block", className)}
    style={{
      backgroundImage:
        "linear-gradient(120deg, rgba(128,128,128,0) 40%, currentColor 50%, rgba(128,128,128,0) 60%)",
      backgroundSize: "200% 100%",
      WebkitBackgroundClip: "text",
      backgroundPosition: isShining ? "-100%" : "110%",
      transition: isShining ? `background-position ${speed}s linear` : "none",
    }}
  >
    {children}
  </span>
);

const DecryptText = ({
  text,
  isDecrypting = false,
  duration = 0.6,
}: {
  text: string;
  isDecrypting?: boolean;
  duration?: number;
}) => {
  const [displayText, setDisplayText] = useState(text);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  useEffect(() => {
    if (!isDecrypting) {
      setDisplayText(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, (duration * 1000) / Math.max(text.length, 1));

    return () => clearInterval(interval);
  }, [isDecrypting, text, duration]);

  return <span>{displayText}</span>;
};

const AnimatedLink = ({
  href,
  label,
  onClick,
  external = false,
  className,
}: {
  href: string;
  label: string;
  onClick?: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
  external?: boolean;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden"
      whileHover="hover"
      initial="initial"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-black/5 dark:bg-white/10 z-0"
        variants={{ initial: { x: "-100%" }, hover: { x: 0 } }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      />
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn("focus-ring z-10 relative h-full", className)}
      >
        <ShinyText isShining={isHovered} speed={1}>
          <DecryptText text={label} isDecrypting={isHovered} />
        </ShinyText>
      </a>
    </motion.div>
  );
};

const AnimatedIconLink = ({
  href,
  icon,
  ariaLabel,
  external = false,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
  external?: boolean;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      whileHover="hover"
      initial="initial"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-black/5 dark:bg-white/10 z-0"
        variants={{ initial: { x: "-100%" }, hover: { x: 0 } }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      />
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="focus-ring text-neutral-500 hover:text-[color:var(--accent)] transition-colors z-10 relative"
      >
        {icon}
      </a>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ *
 * Footer.
 * ------------------------------------------------------------------ */
const HAIRLINE = "border-neutral-200 dark:border-neutral-900";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const isDark = useIsDark();
  const prefersReduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  // Section anchors + blog route, drawn from the shared nav (minus HOME).
  const links = navItems.filter((n) => n.label !== "HOME");

  const socialLinks = [
    { href: personal.socials.linkedin, icon: <Linkedin size={22} />, ariaLabel: "LinkedIn" },
    { href: personal.socials.github, icon: <Github size={22} />, ariaLabel: "GitHub" },
    { href: personal.socials.twitter, icon: <Twitter size={22} />, ariaLabel: "X / Twitter" },
    { href: `mailto:${personal.email}`, icon: <Mail size={22} />, ariaLabel: "Email" },
  ];

  const dotColors = isDark
    ? [
        [195, 228, 29],
        [163, 192, 24],
      ]
    : [
        [92, 124, 18],
        [120, 150, 40],
      ];

  const handleNavClick = (href: string) => (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (isSectionHash(href) || href === "#home") {
      e.preventDefault();
      const id = hashToId(href);
      setHash(href);
      goToSection(id);
    }
  };

  return (
    <footer className={cn("w-full bg-white dark:bg-black text-neutral-900 dark:text-white border-t", HAIRLINE)}>
      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-10 py-12 min-[1250px]:py-16">
        {/* Oversized heading */}
        <div className="mb-10 min-[1250px]:mb-16">
          <h2 className="display-lg text-4xl min-[1250px]:text-7xl font-light leading-[0.95]">
            Let&apos;s build
            <br />
            something
            <br />
            <span className="text-[color:var(--accent)]">together.</span>
          </h2>
        </div>

        <div className={cn("grid grid-cols-1 min-[1250px]:grid-cols-12 border-t border-b", HAIRLINE)}>
          {/* Social icons — 2x2 on mobile, 4-across cluster on desktop (col-span-4) */}
          <div className={cn("grid grid-cols-2 min-[1250px]:col-span-4 min-[1250px]:grid-cols-4 border-b min-[1250px]:border-b-0 min-[1250px]:border-r", HAIRLINE)}>
            {socialLinks.map((link, i) => (
              <AnimatedIconLink
                key={link.ariaLabel}
                href={link.href}
                icon={link.icon}
                ariaLabel={link.ariaLabel}
                external={!link.href.startsWith("mailto:")}
                className={cn(
                  "py-8 flex items-center justify-center",
                  i % 2 === 0 ? "border-r" : "",
                  i < 2 ? "border-b min-[1250px]:border-b-0" : "",
                  "min-[1250px]:border-r min-[1250px]:last:border-r-0",
                  HAIRLINE
                )}
              />
            ))}
          </div>

          {/* Animated dot-matrix panel (col-span-8) */}
          <div className="h-40 min-[1250px]:h-auto min-[1250px]:col-span-8 relative overflow-hidden">
            {mounted && !prefersReduced ? (
              <CanvasRevealEffect
                animationSpeed={5}
                containerClassName="bg-transparent absolute inset-0 pointer-events-auto"
                colors={dotColors}
                dotSize={3}
                isDark={isDark}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent)]/10 to-transparent" />
            )}
          </div>
        </div>

        {/* Nav links + description row */}
        <div className={cn("grid grid-cols-1 min-[1250px]:grid-cols-12 border-b", HAIRLINE)}>
          <div className={cn("grid grid-cols-2 min-[1250px]:col-span-8 min-[1250px]:grid-cols-4 min-[1250px]:border-r", HAIRLINE)}>
            {links.map((link, i) => {
              const external = !link.href.startsWith("#") && !link.href.startsWith("/");
              return (
                <AnimatedLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  external={external}
                  onClick={handleNavClick(link.href)}
                  className={cn(
                    "py-6 flex items-center justify-center text-xs tracking-widest text-neutral-500 hover:text-[color:var(--accent)] transition-colors w-full font-mono uppercase",
                    i % 2 === 0 ? "border-r min-[1250px]:border-r" : "",
                    "min-[1250px]:[&:nth-child(4n)]:border-r-0",
                    "border-b",
                    HAIRLINE
                  )}
                />
              );
            })}
          </div>

          <div className="px-4 py-6 min-[1250px]:py-8 min-[1250px]:col-span-4 text-xs text-neutral-500 leading-relaxed flex items-center">
            <p>{personal.tagline}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 min-[1250px]:py-8 text-center text-xs text-neutral-500 font-mono">
          <p>
            © {new Date().getFullYear()} {personal.fullName}. Built with Next.js + Tailwind.
          </p>
          <p className="mt-2">
            <a
              href="/blogs/"
              className="focus-ring underline-offset-4 hover:underline hover:text-[color:var(--accent)] transition-colors"
            >
              The Brian Journal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
