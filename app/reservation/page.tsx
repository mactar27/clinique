import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingFlow } from "@/components/booking/booking-flow"
import { BookingIntro } from "@/components/booking/booking-intro"

export default function ReservationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <BookingIntro />
          <Suspense fallback={<div className="mx-auto max-w-2xl text-center text-muted-foreground">…</div>}>
            <BookingFlow />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
