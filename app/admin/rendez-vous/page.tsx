"use client"

import { useEffect, useState } from "react"
import { getAppointments, updateAppointmentStatus } from "@/lib/actions/admin"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { toast } from "sonner"
import type { Appointment } from "@/lib/db/schema"
import { Button } from "@/components/ui/button"

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data)
      setLoading(false)
    })
  }, [])

  const handleStatusChange = async (id: string, status: "pending" | "confirmed" | "cancelled" | "completed") => {
    try {
      await updateAppointmentStatus(id, status)
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a))
      
      if (status === "confirmed") {
        toast.success("Rendez-vous confirmé", {
          description: "Un SMS de confirmation a été envoyé au patient."
        })
      } else {
        toast.success("Statut mis à jour")
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
        <p className="mt-2 text-sm text-gray-500">
          Gérez les demandes de consultation de vos patients.
        </p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Aucun rendez-vous trouvé.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-6 py-4 font-medium">Patient</th>
                  <th className="px-6 py-4 font-medium">Spécialité</th>
                  <th className="px-6 py-4 font-medium">Date Souhaitée</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{apt.patientFirstName} {apt.patientLastName}</div>
                      <div className="text-xs text-gray-500">{apt.patientPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{apt.specialtyLabel}</div>
                      <div className="text-xs text-gray-500">{apt.practitioner}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{apt.preferredDate ? format(new Date(apt.preferredDate), 'dd MMM yyyy', { locale: fr }) : "N/A"}</div>
                      <div className="text-xs text-gray-500">{apt.preferredTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${apt.status === 'pending' ? 'bg-orange-100 text-orange-800' : ''}
                        ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                        ${apt.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                        ${apt.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                      `}>
                        {apt.status === 'pending' ? 'En attente' :
                         apt.status === 'confirmed' ? 'Confirmé' :
                         apt.status === 'cancelled' ? 'Annulé' : 'Terminé'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {apt.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleStatusChange(apt.id, "cancelled")}>
                            Annuler
                          </Button>
                          <Button size="sm" className="bg-[#126b43] text-white hover:bg-[#0c4e30]" onClick={() => handleStatusChange(apt.id, "confirmed")}>
                            Confirmer
                          </Button>
                        </div>
                      )}
                      {apt.status === "confirmed" && (
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(apt.id, "completed")}>
                          Marquer terminé
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
