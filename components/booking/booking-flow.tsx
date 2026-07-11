"use client"

import { useMemo, useState, useTransition, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Calendar, Check, ChevronLeft, ChevronRight, Clock, Loader2, Stethoscope, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { specialties, timeSlots } from "@/lib/clinic-data"
import { createBooking, getBookedSlots } from "@/app/actions/booking"
import { cn } from "@/lib/utils"

function todayISO() {
  return new Date().toISOString().split("T")[0]
}

export function BookingFlow() {
  const { t, lang } = useLanguage()
  const searchParams = useSearchParams()
  const preselected = searchParams.get("specialty")

  const [step, setStep] = useState(1)
  const [specialtySlug, setSpecialtySlug] = useState<string>(
    specialties.some((s) => s.slug === preselected) ? (preselected as string) : "",
  )
  const [reason, setReason] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()
  
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    if (date && specialtySlug) {
      setLoadingSlots(true)
      setTime("") // reset time when date changes
      getBookedSlots(specialtySlug, date).then(slots => {
        setBookedSlots(slots)
        setLoadingSlots(false)
      })
    } else {
      setBookedSlots([])
    }
  }, [date, specialtySlug])

  const specialty = useMemo(() => specialties.find((s) => s.slug === specialtySlug), [specialtySlug])

  const steps = [t("step1"), t("step2"), t("step3")]

  const canNextFromStep1 = Boolean(specialtySlug && reason)
  const canNextFromStep2 = Boolean(date && time)
  const canSubmit = Boolean(firstName.trim() && lastName.trim() && phone.trim() && date && time)

  function goNext() {
    setError(null)
    setStep((s) => Math.min(3, s + 1))
  }
  function goBack() {
    setError(null)
    setStep((s) => Math.max(1, s - 1))
  }

  function handleSubmit() {
    if (!specialty || !canSubmit) {
      setError(t("required"))
      return
    }
    startTransition(async () => {
      const res = await createBooking({
        specialtySlug: specialty.slug,
        specialtyLabel: `${specialty.fr} / ${specialty.wo}`,
        reason,
        practitioner: specialty.practitioner,
        firstName,
        lastName,
        phone,
        email,
        date,
        time,
        notes,
      })
      if (res.ok) {
        setDone(true)
      } else {
        setError(res.error === "missing_fields" ? t("required") : "Une erreur est survenue. Réessayez.")
      }
    })
  }

  function reset() {
    setStep(1)
    setSpecialtySlug("")
    setReason("")
    setDate("")
    setTime("")
    setFirstName("")
    setLastName("")
    setPhone("")
    setEmail("")
    setNotes("")
    setError(null)
    setDone(false)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-7" aria-hidden="true" />
        </div>
        <h2 className="mt-5 font-heading text-2xl font-bold text-foreground">{t("successTitle")}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("successText")}</p>
        <div className="mt-4 rounded-xl bg-green-50 p-4 border border-green-100 dark:bg-green-950/30 dark:border-green-900/50">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            📱 Vous recevrez votre confirmation par WhatsApp dans quelques instants.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="outline">
            {t("newBooking")}
          </Button>
          <Button asChild>
            <Link href="/">{t("home")}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2">
        {steps.map((label, i) => {
          const n = i + 1
          const active = step === n
          const complete = step > n
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                    active && "border-primary bg-primary text-primary-foreground",
                    complete && "border-primary bg-primary/10 text-primary",
                    !active && !complete && "border-border bg-card text-muted-foreground",
                  )}
                >
                  {complete ? <Check className="size-4" aria-hidden="true" /> : n}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:inline",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {n < steps.length && <span className="h-px flex-1 bg-border" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {/* Step 1 — Specialty + reason */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">{t("chooseSpecialty")}</h2>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setSpecialtySlug(s.slug)
                      setReason("")
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                      specialtySlug === s.slug
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40",
                    )}
                    aria-pressed={specialtySlug === s.slug}
                  >
                    <Stethoscope className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {lang === "fr" ? s.fr : s.wo}
                      </span>
                      <span className="block text-xs text-muted-foreground">{lang === "fr" ? s.wo : s.fr}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {specialty && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="reason">{t("chooseReason")}</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger id="reason">
                    <SelectValue placeholder={t("chooseReasonPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {specialty.reasons.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={goNext} disabled={!canNextFromStep1} className="gap-1.5">
                {t("next")}
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Practitioner + date/time */}
        {step === 2 && specialty && (
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserRound className="size-5" aria-hidden="true" />
              </span>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("practitioner")}
                </div>
                <div className="font-heading text-sm font-semibold text-foreground">{specialty.practitioner}</div>
                <div className="text-sm text-muted-foreground">{reason}</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="date" className="flex items-center gap-1.5">
                  <Calendar className="size-4 text-primary" aria-hidden="true" />
                  {t("date")}
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={todayISO()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="flex items-center gap-1.5">
                  <Clock className="size-4 text-primary" aria-hidden="true" />
                  {t("time")}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot)
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setTime(slot)}
                        aria-pressed={time === slot}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                          time === slot
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-foreground hover:border-primary/40",
                          isBooked && "opacity-40 cursor-not-allowed hover:border-border line-through"
                        )}
                        title={isBooked ? t("slotBooked") : undefined}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={goBack} variant="outline" className="gap-1.5">
                <ChevronLeft className="size-4" aria-hidden="true" />
                {t("back")}
              </Button>
              <Button onClick={goNext} disabled={!canNextFromStep2} className="gap-1.5">
                {t("next")}
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Patient info + summary */}
        {step === 3 && specialty && (
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-xl font-bold text-foreground">{t("step3")}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">{t("firstName")} *</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">{t("lastName")} *</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">{t("phoneNumber")} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">{t("notes")}</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("notesPlaceholder")}
                rows={3}
              />
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <h3 className="mb-3 font-heading text-sm font-semibold text-foreground">{t("summary")}</h3>
              <dl className="grid gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t("step1")}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {lang === "fr" ? specialty.fr : specialty.wo}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t("chooseReason")}</dt>
                  <dd className="text-right font-medium text-foreground">{reason}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{t("date")}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {date} — {time}
                  </dd>
                </div>
              </dl>
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <div className="flex justify-between">
              <Button onClick={goBack} variant="outline" disabled={pending} className="gap-1.5">
                <ChevronLeft className="size-4" aria-hidden="true" />
                {t("back")}
              </Button>
              <Button onClick={handleSubmit} disabled={!canSubmit || pending} className="gap-1.5">
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    {t("submitting")}
                  </>
                ) : (
                  <>
                    <Check className="size-4" aria-hidden="true" />
                    {t("confirm")}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
