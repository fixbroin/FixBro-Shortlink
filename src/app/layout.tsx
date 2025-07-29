import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header';
import Footer from '@/components/footer';

const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "FixBro Shortlink",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://s.wecanfix.in",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "The simplest and fastest way to shorten your long URLs for free.",
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS?.split(',') || ["url shortener", "link shortener"],
  creator: process.env.NEXT_PUBLIC_SITE_CREATOR || "FixBro",
  publisher: process.env.NEXT_PUBLIC_SITE_PUBLISHER || "FixBro",
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR || '#4285F4',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Simple & Free URL Shortener`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
