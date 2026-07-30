import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsent from "./components/CookieConsent";
import Providers from "./components/Providers";
import { personal } from "./lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

const SITE_URL = "https://bcastelino.github.io";
const SITE_TITLE = `${personal.fullName} — AI Data Engineer & Analytics`;
const SITE_DESCRIPTION =
  "Brian Denis Castelino is an AI Data Engineer and Product Analytics professional with 4.5+ years building scalable data platforms, ML/LLM applications, and self-service BI on Databricks, AWS, GCP and Azure.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${personal.fullName}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Brian Castelino",
    "Brian Denis Castelino",
    "AI Data Engineer",
    "Data Engineer",
    "Data Analytics",
    "Product Analytics",
    "Databricks",
    "Machine Learning",
    "MLOps",
    "Generative AI",
    "LLM",
    "Power BI",
    "Data Engineering Portfolio",
  ],
  authors: [{ name: personal.fullName, url: SITE_URL }],
  creator: personal.fullName,
  publisher: personal.fullName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${personal.fullName} — Portfolio`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: personal.profileImage,
        width: 1200,
        height: 630,
        alt: `${personal.fullName} — AI Data Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@cas7elino",
    images: [personal.profileImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/personal/fevicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: personal.fullName,
      alternateName: "Brian Castelino",
      url: SITE_URL,
      image: `${SITE_URL}${personal.profileImage}`,
      jobTitle: "AI Data Engineer",
      email: `mailto:${personal.email}`,
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dallas",
        addressRegion: "TX",
        addressCountry: "US",
      },
      knowsAbout: [
        "Data Engineering",
        "Machine Learning",
        "Generative AI",
        "Databricks",
        "MLOps",
        "Business Intelligence",
        "Product Analytics",
      ],
      sameAs: [
        personal.socials.linkedin,
        personal.socials.github,
        personal.socials.twitter,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${personal.fullName} — Portfolio`,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
