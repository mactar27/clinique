"use client"

import { useLanguage } from "@/components/language-provider"

export function BookingIntro() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{t("bookingTitle")}</h1>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{t("bookingSubtitle")}</p>
    </div>
  )
}
