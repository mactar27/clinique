import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Clinique MAIMOUNA — Votre santé, notre priorité au quotidien",
  description:
    "La Clinique MAIMOUNA à Rufisque propose des consultations, spécialistes, urgences 24/7, hospitalisation, imagerie et laboratoire. Prenez rendez-vous en ligne.",
  generator: "v0.app",
  openGraph: {
    title: "Clinique MAIMOUNA",
    description: "Une équipe complète de spécialistes à votre service à Rufisque.",
    url: "https://clinique-maimouna.vercel.app",
    siteName: "Clinique MAIMOUNA",
    images: [
      {
        url: "/images/clinic-hero.png",
        width: 1200,
        height: 630,
        alt: "Clinique MAIMOUNA Accueil",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinique MAIMOUNA",
    description: "Votre santé, notre priorité au quotidien.",
    images: ["/images/clinic-hero.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#2f8f56",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} bg-background w-full max-w-[100vw] overflow-x-hidden`}>
      <body className="font-sans antialiased w-full max-w-[100vw] overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
