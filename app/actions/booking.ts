"use server"

import { db } from "@/lib/db"
import { appointments } from "@/lib/db/schema"
import { eq, and, not } from "drizzle-orm"

export type BookingInput = {
  specialtySlug: string
  specialtyLabel: string
  reason: string
  practitioner: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  date: string
  time: string
  notes?: string
}

export type BookingResult = { ok: true; id: string } | { ok: false; error: string }

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const required = [
    input.specialtySlug,
    input.reason,
    input.practitioner,
    input.firstName?.trim(),
    input.lastName?.trim(),
    input.phone?.trim(),
    input.date,
    input.time,
  ]
  if (required.some((v) => !v)) {
    return { ok: false, error: "missing_fields" }
  }

  try {
    const [row] = await db
      .insert(appointments)
      .values({
        specialtySlug: input.specialtySlug,
        specialtyLabel: input.specialtyLabel,
        reason: input.reason,
        practitioner: input.practitioner,
        patientFirstName: input.firstName.trim(),
        patientLastName: input.lastName.trim(),
        patientPhone: input.phone.trim(),
        patientEmail: input.email?.trim() || null,
        preferredDate: input.date,
        preferredTime: input.time,
        notes: input.notes?.trim() || null,
      })
      // Note: returning() is not supported in mysql2 for insert by default without extra setup, but we don't strictly need the ID for the success page
      
    // Assuming insert succeeds, we'll just return a true boolean without ID for now
    const id = crypto.randomUUID() // fallback id for client response

    // SIMULATION D'ENVOI D'EMAIL (Comme demandé pour la démo commerciale)
    console.log("=========================================")
    console.log(`📧 SIMULATION ENVOI EMAIL AU SECRETARIAT`)
    console.log(`Nouveau rendez-vous: ${input.specialtyLabel}`)
    console.log(`Patient: ${input.firstName} ${input.lastName}`)
    console.log(`Date: ${input.date} à ${input.time}`)
    console.log(`Téléphone: ${input.phone}`)
    console.log("=========================================")

    return { ok: true, id }
  } catch (error) {
    console.log("[v0] createBooking error:", error instanceof Error ? error.message : error)
    return { ok: false, error: "server_error" }
  }
}

export async function getBookedSlots(specialtySlug: string, date: string): Promise<string[]> {
  try {
    const booked = await db
      .select({ time: appointments.preferredTime })
      .from(appointments)
      .where(
        and(
          eq(appointments.specialtySlug, specialtySlug),
          eq(appointments.preferredDate, date),
          // We consider 'cancelled' appointments as freeing up the slot
          not(eq(appointments.status, 'cancelled'))
        )
      )
    return booked.map(b => b.time)
  } catch (error) {
    console.error("Failed to fetch booked slots", error)
    return []
  }
}
