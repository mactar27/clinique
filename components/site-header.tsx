"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

const navItems: { key: string; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Accueil" },
  { key: "about", href: "/#a-propos", label: "À propos" },
  { key: "services", href: "/#services", label: "Nos services" },
  { key: "specialties", href: "/#specialites", label: "Spécialités" },
  { key: "doctors", href: "/#medecins", label: "Médecins" },
  { key: "contact", href: "/#acces", label: "Contact" },
]

export function SiteHeader() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-4 lg:px-8">
        <div className="flex w-full items-center justify-between lg:w-auto">
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Clinique MAIMOUNA — accueil">
            <Image
              src="/images/logo-clinique-maimouna.png"
              alt="Logo Clinique MAIMOUNA"
              width={160}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        <nav className="hidden items-center justify-center flex-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:text-[#126b43]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex shrink-0">
          <Button render={<a href="tel:+221338364545" />} variant="outline" size="sm" className="gap-2 rounded-full px-5 py-5 text-sm font-semibold border-slate-200 text-slate-800 hover:bg-slate-50">
            <Phone className="size-4 text-[#126b43]" aria-hidden="true" />
            33 836 45 45
          </Button>
          <Button render={<Link href="/reservation" />} size="sm" className="gap-2 bg-[#0c5936] text-white hover:bg-[#09452a] rounded-full px-6 py-5 text-sm font-semibold shadow-md">
            <CalendarPlus className="size-4" aria-hidden="true" />
            Réserver en ligne
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button render={<a href="tel:+221338364545" />} variant="outline" className="gap-2 w-full justify-center border-slate-200 py-6">
                <Phone className="size-4 text-[#126b43]" aria-hidden="true" />
                33 836 45 45
              </Button>
              <Button render={<Link href="/reservation" onClick={() => setOpen(false)} />} className="gap-2 w-full justify-center bg-[#0c5936] hover:bg-[#09452a] text-white py-6">
                <CalendarPlus className="size-4" aria-hidden="true" />
                Réserver en ligne
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

