"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

const navItems: { key: "about" | "specialties" | "insurances" | "news" | "contact"; href: string; label: string }[] = [
  { key: "about", href: "/#a-propos", label: "L'établissement" },
  { key: "specialties", href: "/#specialites", label: "Nos spécialités" },
  { key: "insurances", href: "/#assurances", label: "Assurances" },
  { key: "news", href: "/#actualites", label: "Actualités" },
  { key: "contact", href: "/#acces", label: "Accès & contact" },
]

export function SiteHeader() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Clinique MAIMOUNA — accueil">
          <Image
            src="/images/logo-clinique-maimouna.png"
            alt="Logo Clinique MAIMOUNA"
            width={150}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button render={<a href="tel:+221338360533" />} variant="destructive" size="sm" className="gap-2 animate-pulse bg-[#f04f4f] text-white hover:bg-red-600 rounded-full px-5 py-5 text-sm font-semibold shadow-md">
            <Phone className="size-4" aria-hidden="true" />
            Urgences : +221 33 836 05 33
          </Button>
          <Button render={<a href="tel:+221338360533" />} variant="outline" size="sm" className="gap-2 rounded-full px-5 py-5 text-sm font-semibold border-border hover:bg-secondary">
            <Phone className="size-4" aria-hidden="true" />
            Appeler
          </Button>
          <Button render={<Link href="/reservation" />} size="sm" className="gap-2 bg-[#126b43] text-white hover:bg-[#0c4e30] rounded-full px-5 py-5 text-sm font-semibold shadow-md">
            <CalendarPlus className="size-4" aria-hidden="true" />
            Prendre rendez-vous
          </Button>
        </div>

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

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Button render={<a href="tel:+221338360533" />} variant="destructive" className="gap-1.5 animate-pulse bg-red-600 text-white hover:bg-red-700 w-full justify-center">
                <Phone className="size-4" aria-hidden="true" />
                Urgences: +221 33 836 05 33
              </Button>
              <Button render={<Link href="/reservation" onClick={() => setOpen(false)} />} className="gap-1.5 w-full justify-center">
                <CalendarPlus className="size-4" aria-hidden="true" />
                {t("bookShort")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
