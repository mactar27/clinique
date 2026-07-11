"use client"

import Image from "next/image"
import { ShieldCheck, HeartHandshake, Languages, CreditCard, BedDouble, ScanLine, FlaskConical, PhoneCall } from "lucide-react"

export function About() {
  const servicesList = [
    { label: "Hospitalisation", icon: BedDouble },
    { label: "Imagerie médicale", icon: ScanLine },
    { label: "Laboratoire d'analyses", icon: FlaskConical },
    { label: "Urgences", icon: PhoneCall },
  ]

  return (
    <section id="a-propos" className="scroll-mt-20 bg-[#fcfdfc] py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Column - Image with floating card */}
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2.5rem] shadow-xl border border-border">
              <Image
                src="/images/clinic-building.png"
                alt="Bâtiment de la Clinique MAIMOUNA"
                width={800}
                height={600}
                className="h-[550px] w-full object-cover"
              />
            </div>
            
            {/* Floating green card */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] rounded-2xl bg-[#0e5c3e] p-6 shadow-xl text-white">
              <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-start gap-4">
                  <HeartHandshake className="size-10 shrink-0 text-green-200" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-bold text-lg leading-snug">Votre santé, notre priorité</h3>
                    <p className="text-sm text-green-100 mt-1 leading-relaxed">Une prise en charge humaine et professionnelle au service de toute la famille.</p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/20 shrink-0"></div>
                <div className="flex items-center gap-3 md:pl-2 shrink-0">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/10">
                    <ShieldCheck className="size-5 text-green-200" />
                  </div>
                  <div className="text-sm font-semibold leading-tight">Qualité &<br/>Confiance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text content */}
          <div className="order-1 flex flex-col gap-6 lg:order-2 lg:pl-6">
            <div className="w-fit">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-sm font-bold text-[#126b43]">
                <HeartHandshake className="size-4" />
                À propos de nous
              </span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-[1.1]">
              Présentation de<br />
              <span className="text-[#126b43] relative inline-block">
                l'établissement
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#126b43]/20 rounded-full"></span>
              </span>
            </h2>
            
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground mt-2">
              La Clinique MAIMOUNA se trouve à Rufisque et offre une grande variété de services : consultations de médecine générale et spécialisée, hospitalisation, imagerie médicale et laboratoire d'analyses.
            </p>

            {/* Information Cards */}
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-[#126b43]">
                    <Languages className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Langues parlées</div>
                    <p className="text-sm text-muted-foreground mt-0.5">Français · Wolof</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-[#126b43]">
                    <CreditCard className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Moyens de paiement</div>
                    <p className="text-sm text-muted-foreground mt-0.5">Espèces</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mt-4">
              <h3 className="mb-4 font-bold text-foreground">Nos services</h3>
              <ul className="flex flex-wrap gap-3">
                {servicesList.map((service) => (
                  <li
                    key={service.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <service.icon className="size-4 text-[#126b43]" aria-hidden="true" />
                    {service.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
