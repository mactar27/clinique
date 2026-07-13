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

export const patients = mysqlTable("patients", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  dateOfBirth: date("date_of_birth"),
  patientCode: varchar("patient_code", { length: 10 }).notNull().unique(), // Code secret pour accéder aux résultats
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const testResults = mysqlTable("test_results", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  patientId: varchar("patient_id", { length: 36 }).notNull(),
  testName: text("test_name").notNull(),
  testDate: date("test_date").notNull(),
  resultUrl: text("result_url").notNull(), // Lien vers le PDF
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  appointmentId: varchar("appointment_id", { length: 36 }),
  type: varchar("type", { length: 20 }).notNull(), // 'SMS' ou 'WHATSAPP'
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("sent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export type Patient = typeof patients.$inferSelect
export type NewPatient = typeof patients.$inferInsert
export type TestResult = typeof testResults.$inferSelect
export type NewTestResult = typeof testResults.$inferInsert
export type Notification = typeof notifications.$inferSelect
export type NewNotification = typeof notifications.$inferInsert

export const staff = mysqlTable("staff", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: varchar("role", { length: 50 }).notNull(), // e.g., Médecin, Infirmier, Réceptionniste, Admin
  specialty: text("specialty"), // e.g., Cardiologie (pour les médecins)
  phone: text("phone").notNull(),
  email: text("email"),
  status: varchar("status", { length: 20 }).notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export type Staff = typeof staff.$inferSelect
export type NewStaff = typeof staff.$inferInsert
