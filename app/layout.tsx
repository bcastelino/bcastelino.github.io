import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Brian Castelino — Portfolio",
  description:
    "Data Analyst, AI Enthusiast and Problem Solver — portfolio of Brian Denis Castelino.",
  icons: {
    icon: "/personal/fevicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var dark = t ? t === 'dark' : true;
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
  // Opt out of the browser's automatic scroll restoration. When the URL has a
  // valid section hash (e.g. #contact) we KEEP it and let the client-side
  // deep-link handler jump there once the layout/ScrollTrigger has settled.
  // Otherwise we preserve the original behaviour: strip any stray hash and
  // always land at the Hero on refresh.
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    var sectionHash = /^#(about|projects|experience|education|certifications|contact)$/;
    var hasSectionHash = location.hash && sectionHash.test(location.hash);
    if (!hasSectionHash) {
      if (location.hash && location.hash !== '#home' && history.state) {
        // Only replaceState when Next.js's App Router state is already present;
        // otherwise we'd persist a null history.state and Next's popstate handler
        // would later crash reading __PRIVATE_NEXTJS_INTERNALS_TREE.
        history.replaceState(history.state, '', location.pathname + location.search);
      }
      window.addEventListener('load', function () { window.scrollTo(0, 0); });
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
