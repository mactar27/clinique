"use client"

import Link from "next/link"
import { ShieldCheck, HeartHandshake, Languages, CreditCard, Stethoscope, BedDouble, ScanLine, FlaskConical, PhoneCall, ChevronRight, Users, MapPin, Clock, ArrowRight } from "lucide-react"

export function About() {
  const servicesList = [
    { label: "Consultations", desc: "Médecine générale et spécialisée", icon: Stethoscope, href: "/#specialites" },
    { label: "Hospitalisation", desc: "Prise en charge complète", icon: BedDouble, href: "/#services" },
    { label: "Imagerie médicale", desc: "Radiologie, échographie, scanner...", icon: ScanLine, href: "/#services" },
    { label: "Laboratoire d'analyses", desc: "Analyses médicales fiables", icon: FlaskConical, href: "/#services" },
    { label: "Urgences", desc: "Disponibles 24h/24 et 7j/7", icon: PhoneCall, href: "tel:+221338360533" },
  ]

  return (
    <section id="a-propos" className="bg-[#fcfdfc] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (4/12) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="w-fit mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-sm font-bold text-[#126b43]">
                <HeartHandshake className="size-4" />
                À propos de nous
              </span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-[1.2] mb-6">
              Présentation de <span className="text-[#126b43]">l'établissement</span>
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">
              La Clinique MAIMOUNA s'engage à offrir des soins de qualité, dans un environnement moderne et sécurisé. Notre équipe médicale qualifiée met l'humain au cœur de chaque prise en charge.
            </p>
            
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#126b43]">
                  <Languages className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Langues parlées</div>
                  <div className="text-xs text-slate-500 mt-0.5">Français • Wolof</div>
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#126b43]">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Moyens de paiement</div>
                  <div className="text-xs text-slate-500 mt-0.5">Espèces • Carte • Mobile Money</div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column (5/12) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#f0f9f4] p-6 flex flex-col border border-green-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#126b43] text-white shadow-sm">
                  <Users className="size-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-extrabold text-slate-900">+10 000</div>
                  <div className="text-[13px] font-medium text-slate-700 leading-tight">Patients accompagnés</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-auto">Une confiance bâtie sur des années d'expérience.</p>
            </div>
            
            <div className="rounded-2xl bg-[#f0f9f4] p-6 flex flex-col border border-green-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#126b43] text-white shadow-sm">
                  <ShieldCheck className="size-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-extrabold text-slate-900">20+</div>
                  <div className="text-[13px] font-medium text-slate-700 leading-tight">Spécialités médicales</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-auto">Une prise en charge complète pour toute la famille.</p>
            </div>
            
            <div className="rounded-2xl bg-[#f0f9f4] p-6 flex flex-col border border-green-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#126b43] text-white shadow-sm">
                  <Clock className="size-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-extrabold text-slate-900">24h/24</div>
                  <div className="text-[13px] font-medium text-slate-700 leading-tight">Urgences disponibles</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-auto">Une équipe prête à intervenir à tout moment.</p>
            </div>
            
            <div className="rounded-2xl bg-[#f0f9f4] p-6 flex flex-col border border-green-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#126b43] text-white shadow-sm">
                  <MapPin className="size-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-slate-900 leading-tight">Localisation</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Rufisque, route des HLM, camp Xavier Lelong, Cité millionnaire.</p>
              <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#126b43] hover:underline flex items-center gap-1 mt-auto w-fit">
                Voir sur Google Maps <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Right Column (3/12) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="font-bold text-slate-900 mb-4">Nos services</h3>
            <div className="flex flex-col gap-2">
              {servicesList.map((service, index) => (
                <Link key={index} href={service.href} className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#126b43]">
                    <service.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-900">{service.label}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{service.desc}</div>
                  </div>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
