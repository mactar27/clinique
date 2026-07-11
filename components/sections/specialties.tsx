"use client"

import Link from "next/link"
import {
  Activity,
  Baby,
  Bone,
  Brain,
  Ear,
  Eye,
  FlaskConical,
  Heart,
  Droplet,
  Scan,
  Scissors,
  Stethoscope,
  UserRound,
  Waves,
  CalendarPlus,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { specialties } from "@/lib/clinic-data"

const icons: Record<string, LucideIcon> = {
  "medecine-generale": Stethoscope,
  diabetologie: Droplet,
  kinesitherapie: Waves,
  cardiologie: Heart,
  dermatologie: UserRound,
  ophtalmologie: Eye,
  radiologie: Scan,
  gynecologie: Activity,
  urologie: Droplet,
  orthopedie: Bone,
  orl: Ear,
  "chirurgie-generale": Scissors,
  neurologie: Brain,
  pediatrie: Baby,
  laboratoire: FlaskConical,
}

export function Specialties() {
  return (
    <section id="specialites" className="scroll-mt-20 bg-[#fcfdfc] py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-extrabold text-[#1a1a1a]">
            Nos <span className="text-[#126b43]">spécialités</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-12 bg-border/80"></div>
            <Heart className="size-4 text-[#126b43]" strokeWidth={2} />
            <div className="h-px w-12 bg-border/80"></div>
          </div>
          
          <p className="text-pretty text-base text-muted-foreground">Une équipe complète de spécialistes à votre service.</p>
        </div>

        {/* Grid */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.slice(0, 12).map((s) => {
            const Icon = icons[s.slug] ?? Stethoscope
            return (
              <li key={s.slug}>
                <div className="group flex h-full flex-col items-center text-center gap-4 rounded-3xl border border-border/40 bg-white p-6 shadow-sm transition-all hover:border-[#126b43]/30 hover:shadow-md">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#126b43]">
                    <Icon className="size-8" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  
                  <div className="mb-2">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {s.fr}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 px-4">{s.fr} de la CLINIQUE MAIMOUNA</p>
                  </div>
                  
                  <div className="mt-auto pt-2 w-full">
                    <Button render={<Link href={`/reservation?specialty=${s.slug}`} />} className="w-[90%] mx-auto flex gap-2 bg-[#126b43] text-white hover:bg-[#0c4e30] rounded-xl shadow-md">
                      <CalendarPlus className="size-4" />
                      Prendre RDV
                      <span className="sr-only">avec {s.fr}</span>
                    </Button>
                    <p className="text-[10px] text-muted-foreground mt-1 hidden lg:block">avec ce praticien</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Bottom Banner */}
        <div className="mt-12 w-full rounded-3xl bg-green-50/50 border border-green-100 p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            
            {/* Left Box */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-border/40 w-full lg:w-auto">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#126b43] text-white">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Des soins de qualité, une équipe dévouée.</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Votre santé, notre priorité au quotidien.</p>
              </div>
            </div>
            
            {/* Middle Stats */}
            <div className="flex items-center gap-6 lg:gap-12 text-center divide-x divide-border w-full lg:w-auto justify-evenly lg:justify-center">
              <div className="px-2">
                <div className="font-extrabold text-base text-foreground">15+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Spécialités</div>
              </div>
              <div className="px-6">
                <div className="font-extrabold text-base text-foreground">Équipe qualifiée</div>
                <div className="text-xs text-muted-foreground mt-0.5">et expérimentée</div>
              </div>
              <div className="px-6">
                <div className="font-extrabold text-base text-foreground">Matériel moderne</div>
                <div className="text-xs text-muted-foreground mt-0.5">et sécurisé</div>
              </div>
            </div>
            
            {/* Right Action */}
            <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
              <Button render={<Link href="/reservation" />} className="w-full lg:w-auto gap-2 bg-[#126b43] text-white hover:bg-[#0c4e30] rounded-xl px-6">
                <CalendarPlus className="size-4" />
                Prendre rendez-vous
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Ou appelez : <a href="tel:+221338360533" className="font-bold text-foreground">+221 33 836 05 33</a>
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  )
}
