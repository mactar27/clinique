"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarPlus, MapPin, Stethoscope, ArrowRight, ShieldCheck, Clock, Users, HeartPulse, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative w-full bg-[#fcfdfc] pt-16 pb-8">
      {/* Decorative pattern (subtle dotted circle) */}
      <div className="absolute top-0 right-1/4 opacity-10 pointer-events-none -z-10 max-w-full overflow-hidden">
        <svg className="w-[400px] max-w-full h-auto" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="199" stroke="#126b43" strokeWidth="2" strokeDasharray="4 12"/>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6 relative z-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#126b43]/20 bg-[#126b43]/5 px-4 py-1.5 text-sm font-semibold text-[#126b43]">
              <Stethoscope className="size-4" aria-hidden="true" />
              Clinique médicale à Rufisque
            </span>
            
            <h1 className="text-balance font-heading text-4xl sm:text-5xl font-extrabold leading-[1.1] text-[#126b43] md:text-6xl lg:text-[4.5rem]">
              Votre santé, entre de bonnes mains
            </h1>
            
            <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              La Clinique MAIMOUNA, située à Rufisque, offre une large gamme de services médicaux et de spécialistes pour toute la famille.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Button render={<Link href="/reservation" />} size="lg" className="gap-2 bg-[#126b43] text-white hover:bg-[#0c4e30] rounded-full px-6 py-6 text-base shadow-lg shadow-[#126b43]/20">
                <CalendarPlus className="size-5" aria-hidden="true" />
                Réserver en ligne
              </Button>
              <Button render={<Link href="/#specialites" />} size="lg" variant="outline" className="gap-2 rounded-full px-6 py-6 text-base border-border hover:bg-secondary">
                Voir nos spécialités
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
            
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-3 text-sm text-muted-foreground w-fit max-w-full">
              <MapPin className="size-4 shrink-0 text-[#f04f4f]" aria-hidden="true" />
              <span className="truncate whitespace-normal">Route des HLM, camp Xavier Lelong, Cité millionnaire, Rufisque</span>
            </div>

            {/* Features Row */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:flex sm:flex-nowrap sm:justify-between rounded-2xl bg-white border border-border/50 shadow-sm p-4 w-full">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#126b43]">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground leading-tight">Soins de qualité</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">Equipe qualifiée</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#126b43]">
                  <Clock className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground leading-tight">Disponibilité</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">7j/7 - 24h/24</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#126b43]">
                  <Users className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground leading-tight">Approche humaine</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">À l'écoute</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#126b43]">
                  <HeartPulse className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground leading-tight">Matériel moderne</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">Technologies</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative z-10 mt-10 lg:mt-0">
            <div className="relative overflow-hidden rounded-3xl shadow-xl border border-border">
              <Image
                src="/images/clinic-hero.png"
                alt="Médecin de la Clinique MAIMOUNA en consultation avec un patient"
                width={800}
                height={600}
                className="h-[350px] sm:h-[450px] lg:h-[550px] w-full object-cover"
                priority
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute bottom-[-4rem] sm:bottom-[-2rem] left-0 right-0 mx-auto w-[95%] lg:w-full lg:left-[-1.5rem] lg:right-[-1.5rem] rounded-2xl bg-white py-4 shadow-xl border border-border/50 z-20">
              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="flex flex-col md:flex-row items-center gap-2 px-2 text-center md:text-left">
                  <div className="text-[#126b43] bg-green-50 p-2 rounded-full hidden sm:block">
                    <Users className="size-6" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg md:text-xl font-extrabold text-foreground">+10k</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Patients<br className="sm:hidden" /> accompagnés</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 px-2 text-center md:text-left">
                  <div className="text-[#126b43] bg-green-50 p-2 rounded-full hidden sm:block">
                    <ShieldCheck className="size-6" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg md:text-xl font-extrabold text-foreground">20+</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Spécialités<br className="sm:hidden" /> médicales</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 px-2 text-center md:text-left">
                  <div className="text-[#126b43] bg-green-50 p-2 rounded-full hidden sm:block">
                    <HeartPulse className="size-6" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg md:text-xl font-extrabold text-foreground">7j/7</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight">À votre<br className="sm:hidden" /> service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-32 mb-10 w-full rounded-2xl bg-[#0e5c3e] px-8 py-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full border border-white/20 text-white">
                <PhoneCall className="size-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white max-w-[280px] leading-tight">
                Besoin d'une assistance médicale immédiate ?
              </h3>
            </div>
            <p className="text-emerald-50 text-base max-w-md md:border-l border-white/20 md:pl-6 hidden lg:block">
              Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos urgences.
            </p>
            <Button render={<a href="tel:+221338360533" />} size="lg" className="gap-2 bg-[#f04f4f] text-white hover:bg-red-600 rounded-full px-4 sm:px-8 py-6 sm:py-7 text-sm sm:text-lg font-semibold shadow-md w-full sm:w-auto h-auto">
              <PhoneCall className="size-4 sm:size-5 shrink-0" />
              <span>Urgences : +221 33 836 05 33</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
