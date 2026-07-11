"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { clinic } from "@/lib/clinic-data"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Image
            src="/images/logo-clinique-maimouna.png"
            alt="Logo Clinique MAIMOUNA"
            width={160}
            height={48}
            className="h-11 w-auto object-contain"
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t("footerTagline")}</p>
        </div>

        <div className="space-y-3">
          <h2 className="font-heading text-sm font-semibold text-foreground">{t("quickLinks")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/#a-propos" className="hover:text-foreground">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link href="/#specialites" className="hover:text-foreground">
                {t("specialties")}
              </Link>
            </li>
            <li>
              <Link href="/#assurances" className="hover:text-foreground">
                {t("insurances")}
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-foreground">
                {t("book")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-heading text-sm font-semibold text-foreground">{t("contact")}</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{clinic.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href="tel:+221338360533" className="hover:text-foreground">
                {t("call")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 text-xs text-muted-foreground md:flex-row">
          <div>
            {"© "}
            {new Date().getFullYear()} {clinic.name}. {t("footerRights")}
          </div>
          <div>
            Réalisé par{" "}
            <a
              href="https://wockytech.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary hover:underline"
            >
              WockyTech
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
