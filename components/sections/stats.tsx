"use client"

import { Building2, Languages, ShieldCheck, Stethoscope } from "lucide-react"

export function Stats() {
  const items = [
    { icon: Stethoscope, value: "15+", label: "Spécialités" },
    { icon: ShieldCheck, value: "156+", label: "Assurances acceptées" },
    { icon: Languages, value: "2", label: "Langues parlées" },
    { icon: Building2, value: "Disponible", label: "Hospitalisation" },
  ]

  return (
    <section className="relative w-full bg-[#fcfdfc] z-20 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 rounded-2xl bg-white border border-border/40 shadow-sm p-6 md:p-8 md:divide-x divide-border">
          {items.map((item) => (
            <div key={item.label} className="flex flex-1 items-center justify-center gap-4 px-4 w-full md:w-auto">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-[#126b43]">
                <item.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <div className="font-heading text-2xl font-extrabold text-foreground">{item.value}</div>
                <div className="text-sm font-medium text-muted-foreground mt-0.5">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
