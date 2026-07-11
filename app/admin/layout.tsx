import Link from "next/link"
import { Calendar, LayoutDashboard, FileText, Settings, Stethoscope } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-[#126b43]">
            <Stethoscope className="size-5" />
            <span>Admin MAIMOUNA</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-[#126b43]/10 px-3 py-2 text-sm font-medium text-[#126b43]">
            <LayoutDashboard className="size-4" />
            Tableau de bord
          </Link>
          <Link href="/admin/rendez-vous" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            <Calendar className="size-4" />
            Rendez-vous
          </Link>
          <Link href="/admin/resultats" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            <FileText className="size-4" />
            Résultats
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
            <Settings className="size-4" />
            Paramètres
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 sm:hidden">
          <span className="font-bold text-[#126b43]">Admin MAIMOUNA</span>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
