"use server"

import { db } from "@/lib/db"
import { appointments, notifications, testResults, patients } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getAppointments() {
  return await db.select().from(appointments).orderBy(desc(appointments.createdAt))
}

export async function updateAppointmentStatus(id: string, status: "pending" | "confirmed" | "cancelled" | "completed") {
  await db.update(appointments).set({ status }).where(eq(appointments.id, id))
  
  if (status === "confirmed") {
    // Simuler l'envoi d'un SMS ou WhatsApp "Anti-Lapin"
    await db.insert(notifications).values({
      appointmentId: id,
      type: "SMS",
      message: "Votre rendez-vous est confirmé pour la date convenue. Merci de votre confiance.",
      status: "sent"
    })
  }

  revalidatePath("/admin/rendez-vous")
  return { success: true }
}

export async function getRecentNotifications() {
  return await db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(5)
}

export async function addTestResult(data: {
  patientCode: string
  testName: string
  testDate: string
  resultUrl: string
}) {
  // Chercher ou créer un patient
  let patient = await db.select().from(patients).where(eq(patients.patientCode, data.patientCode)).limit(1)
  let patientId = patient[0]?.id

  if (!patientId) {
    // Créer un faux patient pour la démo si inexistant
    const newP = await db.insert(patients).values({
      firstName: "Patient",
      lastName: "Test",
      phone: "+221700000000",
      patientCode: data.patientCode
    })
    // @ts-ignore : TiDB return format
    patientId = newP[0]?.insertId || (await db.select().from(patients).where(eq(patients.patientCode, data.patientCode)).limit(1))[0].id
  }

  await db.insert(testResults).values({
    patientId,
    testName: data.testName,
    testDate: new Date(data.testDate),
    resultUrl: data.resultUrl
  })

  revalidatePath("/admin/resultats")
  return { success: true }
}

export async function getTestResultsByCode(code: string) {
  const patient = await db.select().from(patients).where(eq(patients.patientCode, code)).limit(1)
  if (!patient.length) return null

  const results = await db.select().from(testResults).where(eq(testResults.patientId, patient[0].id)).orderBy(desc(testResults.testDate))
  return { patient: patient[0], results }
}
