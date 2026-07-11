"use client"

import Link from "next/link"
import { CalendarPlus, Info, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { clinic } from "@/lib/clinic-data"

export function Contact() {
  const mapsQuery = encodeURIComponent(`${clinic.address}, ${clinic.city}, Sénégal`)

  return (
    <section id="acces" className="scroll-mt-20 bg-[#fcfdfc] py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-extrabold text-[#1a1a1a]">Carte et informations d'accès</h2>
          
          <div className="flex items-center justify-center gap-3 mt-4 mb-10">
            <div className="h-px w-8 bg-[#126b43]"></div>
            <MapPin className="size-4 text-[#126b43]" strokeWidth={2} />
            <div className="h-px w-8 bg-[#126b43]"></div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="flex flex-col gap-4">
            {/* Address Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#126b43]">
                <MapPin className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Adresse</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Route des HLM,<br/>
                  camp Xavier Lelong,<br/>
                  Cité millionnaire, Rufisque
                </p>
              </div>
            </div>

            {/* Access Info Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#126b43]">
                <Info className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Informations d'accès</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  En face des<br/>
                  sapeurs-pompiers
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#126b43]">
                <Phone className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-foreground">Téléphone</h3>
                <a href="tel:+221338360533" className="mt-1 block text-sm text-muted-foreground hover:text-foreground">
                  +221 33 836 05 33
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button asChild variant="outline" className="gap-2 rounded-xl py-6 border-border/80 text-foreground font-semibold flex-1">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Ouvrir dans Google Maps
                </a>
              </Button>
              <Button asChild className="gap-2 rounded-xl py-6 bg-[#126b43] text-white hover:bg-[#0c4e30] font-semibold shadow-md flex-1">
                <Link href="/reservation">
                  <CalendarPlus className="size-4" aria-hidden="true" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="h-[450px] lg:h-full min-h-[450px] overflow-hidden rounded-3xl shadow-md border border-border/40">
            <iframe
              title="Carte de la Clinique MAIMOUNA"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
