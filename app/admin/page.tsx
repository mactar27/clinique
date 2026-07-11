import { getAppointments, getRecentNotifications } from "@/lib/actions/admin"
import { Users, CalendarCheck, MessageCircle } from "lucide-react"

export default async function AdminDashboard() {
  const appointments = await getAppointments()
  const notifications = await getRecentNotifications()

  const pendingCount = appointments.filter(a => a.status === "pending").length
  const confirmedCount = appointments.filter(a => a.status === "confirmed").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-2 text-sm text-gray-500">
          Bienvenue dans l'espace d'administration de la Clinique MAIMOUNA.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Confirmés</p>
              <p className="text-2xl font-bold text-gray-900">{confirmedCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">SMS Envoyés</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
