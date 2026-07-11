"use client"

import { useState, useEffect } from "react"
import { getAppointments, updateAppointmentStatus } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X, CalendarClock, Loader2 } from "lucide-react"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useState(false)
  
  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30">
        <div className="w-full max-w-sm p-8 bg-card rounded-2xl shadow-sm border border-border text-center">
          <h1 className="text-xl font-heading font-bold mb-6 text-foreground">Accès Backoffice</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            if (password === "demo2026") setAuth(true)
            else alert("Mot de passe incorrect")
          }}>
            <Input 
              type="password" 
              placeholder="Mot de passe..." 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button type="submit" className="w-full">Se connecter</Button>
          </form>
        </div>
      </div>
    )
  }
  
  return <Dashboard />
}

function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [rescheduleApp, setRescheduleApp] = useState<any | null>(null)
  const [rescheduleDate, setRescheduleDate] = useState("")
  
  useEffect(() => {
    fetchData()
  }, [])
  
  async function fetchData() {
    setLoading(true)
    const data = await getAppointments()
    setAppointments(data)
    setLoading(false)
  }
  
  async function handleStatus(id: string, status: string, patientName: string, phone: string, date: string, time: string, specialty: string, customNewDate?: string) {
    let newDate = ""
    if (status === 'rescheduled') {
      if (!customNewDate) return
      newDate = customNewDate
    }

    const res = await updateAppointmentStatus(id, status)
    if (res.ok) {
      let message = ""
      const dateFr = new Date(date).toLocaleDateString('fr-FR')
      
      if (status === 'confirmed') {
        message = `Bonjour ${patientName},\n\nVotre rendez-vous en ${specialty} le ${dateFr} à ${time} est CONFIRMÉ. Merci de votre confiance.`
      } else if (status === 'cancelled') {
        message = `Bonjour ${patientName},\n\nVotre rendez-vous en ${specialty} le ${dateFr} à ${time} a malheureusement été ANNULÉ. Merci de nous recontacter.`
      } else if (status === 'rescheduled') {
        message = `Bonjour ${patientName},\n\nLe secrétariat de la clinique Maimouna souhaite REPORTER votre rendez-vous en ${specialty} initialement prévu le ${dateFr} à ${time}.\n\n👉 Nous vous proposons le : ${newDate}.\n\nMerci de nous confirmer si cela vous convient en répondant à ce message.`
      }
      
      // Formatage du numéro pour WhatsApp (Sénégal)
      let cleanPhone = phone.replace(/[^0-9]/g, '')
      if (cleanPhone.length === 9) cleanPhone = '221' + cleanPhone
      else if (!cleanPhone.startsWith('221')) cleanPhone = '221' + cleanPhone

      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
      
      fetchData()
    } else {
      alert("Erreur lors de la mise à jour.")
    }
  }

  return (
    <div className="min-h-screen bg-secondary/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Tableau de bord - Réception</h1>
          <Button variant="outline" onClick={() => window.location.href = "/"}>Retour au site</Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="animate-spin size-8 text-primary" /></div>
        ) : (
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="p-4 font-semibold text-foreground">Patient</th>
                    <th className="p-4 font-semibold text-foreground">Contact</th>
                    <th className="p-4 font-semibold text-foreground">Spécialité & Motif</th>
                    <th className="p-4 font-semibold text-foreground">Date Souhaitée</th>
                    <th className="p-4 font-semibold text-foreground">Statut</th>
                    <th className="p-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">Aucun rendez-vous pour le moment.</td>
                    </tr>
                  )}
                  {appointments.map(app => (
                    <tr key={app.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{app.patientFirstName} {app.patientLastName}</div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <div>{app.patientPhone}</div>
                        {app.patientEmail && <div className="text-xs">{app.patientEmail}</div>}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">{app.specialtyLabel}</div>
                        <div className="text-muted-foreground text-xs">{app.reason}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">{new Date(app.preferredDate).toLocaleDateString("fr-FR")}</div>
                        <div className="text-muted-foreground text-xs">à {app.preferredTime}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1.5 rounded-full text-xs font-semibold
                          ${app.status === 'confirmed' ? 'bg-green-100 text-green-800 border border-green-200' : 
                            app.status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' : 
                            app.status === 'rescheduled' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 
                            'bg-blue-100 text-blue-800 border border-blue-200'}`}
                        >
                          {app.status === 'confirmed' ? 'Confirmé' : 
                           app.status === 'cancelled' ? 'Annulé' : 
                           app.status === 'rescheduled' ? 'À Reporter' : 'En attente'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="icon-sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 hover:border-green-300" onClick={() => handleStatus(app.id, 'confirmed', `${app.patientFirstName} ${app.patientLastName}`, app.patientPhone, app.preferredDate, app.preferredTime, app.specialtyLabel)} title="Confirmer">
                            <Check className="size-4" />
                          </Button>
                          <Button size="icon-sm" variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 hover:border-orange-300" onClick={() => { setRescheduleApp(app); setRescheduleDate(""); }} title="Reporter">
                            <CalendarClock className="size-4" />
                          </Button>
                          <Button size="icon-sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300" onClick={() => handleStatus(app.id, 'cancelled', `${app.patientFirstName} ${app.patientLastName}`, app.patientPhone, app.preferredDate, app.preferredTime, app.specialtyLabel)} title="Annuler">
                            <X className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Reschedule Modal */}
      {rescheduleApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-xl p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Reporter le rendez-vous</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Entrez la nouvelle date et heure à proposer à <strong className="text-foreground">{rescheduleApp.patientFirstName} {rescheduleApp.patientLastName}</strong>.
            </p>
            <div className="mb-6 space-y-2">
              <Label htmlFor="newDate">Nouvelle proposition</Label>
              <Input 
                id="newDate" 
                value={rescheduleDate} 
                onChange={(e) => setRescheduleDate(e.target.value)} 
                placeholder="ex: Jeudi 30 Juillet à 10h00" 
                autoFocus 
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setRescheduleApp(null)}>Annuler</Button>
              <Button 
                disabled={!rescheduleDate.trim()} 
                onClick={() => {
                  handleStatus(rescheduleApp.id, 'rescheduled', `${rescheduleApp.patientFirstName} ${rescheduleApp.patientLastName}`, rescheduleApp.patientPhone, rescheduleApp.preferredDate, rescheduleApp.preferredTime, rescheduleApp.specialtyLabel, rescheduleDate)
                  setRescheduleApp(null)
                }}
              >
                Générer WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
