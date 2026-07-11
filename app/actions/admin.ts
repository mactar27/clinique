"use server"

import { db } from "@/lib/db"
import { appointments } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export async function getAppointments() {
  try {
    return await db.select().from(appointments).orderBy(desc(appointments.createdAt))
  } catch (error) {
    console.error("Failed to fetch appointments", error)
    return []
  }
}

export async function updateAppointmentStatus(id: string, status: string) {
  try {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id))
    
    await db.update(appointments).set({ status }).where(eq(appointments.id, id))
    
    if (appointment) {
      console.log("=========================================")
      console.log(`📱 SIMULATION ENVOI WHATSAPP AU PATIENT`)
      console.log(`À: ${appointment.patientPhone} (${appointment.patientFirstName} ${appointment.patientLastName})`)
      
      let message = ""
      if (status === 'confirmed') {
        message = `Votre rendez-vous en ${appointment.specialtyLabel} le ${new Date(appointment.preferredDate).toLocaleDateString('fr-FR')} à ${appointment.preferredTime} est CONFIRMÉ.`
      } else if (status === 'cancelled') {
        message = `Votre rendez-vous en ${appointment.specialtyLabel} a été ANNULÉ. Merci de contacter le secrétariat.`
      } else if (status === 'rescheduled') {
        message = `Le secrétariat souhaite REPORTER votre rendez-vous en ${appointment.specialtyLabel}. Vous serez contacté(e) sous peu.`
      }
      
      console.log(`Message: ${message}`)
      console.log("=========================================")
    }

    return { ok: true }
  } catch (error) {
    console.error("Failed to update status", error)
    return { ok: false }
  }
}
