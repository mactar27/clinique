"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { clinic } from "@/lib/clinic-data"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#126b43] text-emerald-50/80 mt-16 rounded-t-[2.5rem]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <div className="bg-white inline-flex p-2 rounded-2xl">
            <Image
              src="/images/logo-clinique-maimouna.png"
              alt="Logo Clinique MAIMOUNA"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-emerald-100/80">{t("footerTagline")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-sm font-bold text-white uppercase tracking-wider">{t("quickLinks")}</h2>
          <ul className="space-y-3 text-sm text-emerald-100/80">
            <li>
              <Link href="/#a-propos" className="hover:text-white transition-colors">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link href="/#specialites" className="hover:text-white transition-colors">
                {t("specialties")}
              </Link>
            </li>
            <li>
              <Link href="/#assurances" className="hover:text-white transition-colors">
                {t("insurances")}
              </Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-white transition-colors">
                {t("book")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-sm font-bold text-white uppercase tracking-wider">{t("contact")}</h2>
          <ul className="space-y-4 text-sm text-emerald-100/80">
            <li className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                <MapPin className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-1">{clinic.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                <Phone className="size-4" aria-hidden="true" />
              </span>
              <a href="tel:+221338360533" className="hover:text-white transition-colors font-medium">
                {t("call")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-800/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-emerald-200/60 md:flex-row">
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
              className="font-medium text-emerald-100 hover:text-white hover:underline transition-colors"
            >
              WockyTech
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
