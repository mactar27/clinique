"use client"

import { useState } from "react"
import { Users, Mail, Phone, Plus, Stethoscope, BriefcaseMedical, Edit, X, Loader2 } from "lucide-react"
import { addStaff, updateStaff } from "@/lib/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StaffTable({ initialStaff }: { initialStaff: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "Médecin",
    specialty: "",
    phone: "",
    email: "",
    status: "active"
  })

  const openAddModal = () => {
    setIsEditing(false)
    setCurrentId(null)
    setFormData({
      firstName: "",
      lastName: "",
      role: "Médecin",
      specialty: "",
      phone: "",
      email: "",
      status: "active"
    })
    setError("")
    setIsModalOpen(true)
  }

  const openEditModal = (member: any) => {
    setIsEditing(true)
    setCurrentId(member.id)
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      specialty: member.specialty || "",
      phone: member.phone,
      email: member.email || "",
      status: member.status
    })
    setError("")
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isEditing && currentId) {
        await updateStaff(currentId, formData)
      } else {
        await addStaff(formData)
      }
      setIsModalOpen(false)
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personnel</h1>
          <p className="mt-2 text-sm text-gray-500">
            Gérez la base de données de l'équipe médicale et administrative.
          </p>
        </div>
        <button 
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-md bg-[#126b43] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0c5936] transition-colors"
        >
          <Plus className="size-4" />
          Ajouter un membre
        </button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Nom & Prénom</th>
                <th className="px-6 py-4 font-semibold">Rôle</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Statut</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialStaff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun membre du personnel trouvé.
                  </td>
                </tr>
              ) : (
                initialStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {member.role === "Médecin" ? (
                          <Stethoscope className="size-4 text-[#126b43]" />
                        ) : (
                          <BriefcaseMedical className="size-4 text-blue-500" />
                        )}
                        <span className="font-medium text-gray-900">{member.role}</span>
                      </div>
                      {member.specialty && (
                        <div className="text-xs text-gray-500 mt-0.5">{member.specialty}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone className="size-3 text-gray-400" />
                        {member.phone}
                      </div>
                      {member.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="size-3 text-gray-400" />
                          {member.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        member.status === "active" ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" : "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      }`}>
                        {member.status === "active" ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => openEditModal(member)}
                        className="inline-flex items-center gap-1.5 text-[#126b43] hover:text-[#09452a] font-medium text-xs px-3 py-1.5 rounded hover:bg-[#126b43]/10 transition-colors"
                      >
                        <Edit className="size-3.5" />
                        Éditer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal d'ajout / édition */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {isEditing ? "Modifier le membre" : "Ajouter un membre"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Prénom *</label>
                  <Input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="Ex: Jean" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Nom *</label>
                  <Input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Ex: Dupont" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Rôle *</label>
                  <select 
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="Médecin">Médecin</option>
                    <option value="Infirmier">Infirmier</option>
                    <option value="Réceptionniste">Réceptionniste</option>
                    <option value="Admin">Administrateur</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Spécialité</label>
                  <Input value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} placeholder="Ex: Cardiologie (Optionnel)" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Téléphone *</label>
                  <Input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="77 000 00 00" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="jean@maimouna.sn" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Statut *</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="active" checked={formData.status === "active"} onChange={() => setFormData({...formData, status: "active"})} className="text-[#126b43] focus:ring-[#126b43]" />
                    <span className="text-sm">Actif</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="inactive" checked={formData.status === "inactive"} onChange={() => setFormData({...formData, status: "inactive"})} className="text-[#126b43] focus:ring-[#126b43]" />
                    <span className="text-sm">Inactif</span>
                  </label>
                </div>
              </div>

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={loading} className="bg-[#126b43] hover:bg-[#0c5936] text-white">
                  {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                  {isEditing ? "Enregistrer" : "Ajouter"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
