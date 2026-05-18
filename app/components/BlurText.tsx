"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3";
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
  as = "p",
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return React.createElement(
    as,
    {
      ref: ref as React.RefObject<HTMLElement>,
      className: `flex flex-wrap ${className}`,
      style,
    },
    segments.map((segment, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          filter: inView ? "blur(0px)" : "blur(10px)",
          opacity: inView ? 1 : 0,
          transform: inView
            ? "translateY(0)"
            : `translateY(${direction === "top" ? "-20px" : "20px"})`,
          transition: `all 0.6s ease-out ${i * delay}ms`,
          whiteSpace: "pre",
        }}
      >
        {segment}
        {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
      </span>
    ))
  );
};

export default BlurText;
