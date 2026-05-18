import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Brian Castelino — Portfolio",
  description:
    "Data Analyst, AI Enthusiast and Problem Solver — portfolio of Brian Denis Castelino.",
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
  // Always land at the Hero on refresh: opt out of the browser's
  // automatic scroll restoration and clear any leftover hash.
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (location.hash && location.hash !== '#home' && history.state) {
      // Only replaceState when Next.js's App Router state is already present;
      // otherwise we'd persist a null history.state and Next's popstate handler
      // would later crash reading __PRIVATE_NEXTJS_INTERNALS_TREE.
      history.replaceState(history.state, '', location.pathname + location.search);
    }
    window.addEventListener('load', function () { window.scrollTo(0, 0); });
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
