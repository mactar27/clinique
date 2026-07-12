import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"

import { About } from "@/components/sections/about"
import { Specialties } from "@/components/sections/specialties"
import { Insurances } from "@/components/sections/insurances"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1 w-full">
        <Hero />

        <About />
        <Specialties />
        <Insurances />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
