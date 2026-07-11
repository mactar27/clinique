"use client"

import { useLanguage } from "@/components/language-provider"
import { CalendarPlus } from "lucide-react"

export function BookingIntro() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <div className="inline-flex items-center justify-center p-3 mb-6 bg-green-50 rounded-full text-[#126b43]">
        <CalendarPlus className="size-8" strokeWidth={1.5} />
      </div>
      <h1 className="font-heading text-4xl font-extrabold text-[#1a1a1a] md:text-5xl tracking-tight">
        {t("bookingTitle")}
      </h1>
      <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
        {t("bookingSubtitle")}
      </p>
    </div>
  )
}
