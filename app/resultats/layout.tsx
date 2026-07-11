import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50/50">
      <SiteHeader />
      <main className="flex-1 w-full py-12 px-4">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
