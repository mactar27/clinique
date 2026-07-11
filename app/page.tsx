import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Stats } from "@/components/sections/stats"
import { About } from "@/components/sections/about"
import { Specialties } from "@/components/sections/specialties"
import { Insurances } from "@/components/sections/insurances"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Specialties />
        <Insurances />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
