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
  title: "Clinique MAIMOUNA — Clinique médicale à Rufisque",
  description:
    "La Clinique MAIMOUNA à Rufisque propose consultations, spécialistes, hospitalisation, imagerie et laboratoire. Prenez rendez-vous en ligne. Faju ci Rufisque.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#2f8f56",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
