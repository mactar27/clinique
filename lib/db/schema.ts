import { mysqlTable, varchar, text, date, timestamp } from "drizzle-orm/mysql-core"

export const appointments = mysqlTable("appointments", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  specialtySlug: text("specialty_slug").notNull(),
  specialtyLabel: text("specialty_label").notNull(),
  reason: text("reason").notNull(),
  practitioner: text("practitioner").notNull(),
  patientFirstName: text("patient_first_name").notNull(),
  patientLastName: text("patient_last_name").notNull(),
  patientPhone: text("patient_phone").notNull(),
  patientEmail: text("patient_email"),
  preferredDate: date("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export type Appointment = typeof appointments.$inferSelect
export type NewAppointment = typeof appointments.$inferInsert
