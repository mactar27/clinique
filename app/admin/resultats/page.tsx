"use client"

import { useState } from "react"
import { addTestResult } from "@/lib/actions/admin"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminResultsPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientCode: "",
    testName: "Bilan Sanguin Général",
    testDate: new Date().toISOString().split("T")[0],
    resultUrl: "https://example.com/resultat.pdf"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addTestResult(formData)
      toast.success("Résultat ajouté avec succès")
      setFormData({ ...formData, patientCode: "" })
    } catch (error) {
      toast.error("Erreur lors de l'ajout")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Résultats d'Analyses</h1>
        <p className="mt-2 text-sm text-gray-500">
          Uploadez ou liez un résultat médical à un patient via son code unique.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="patientCode">Code Patient (ex: MAI-1234)</Label>
            <Input 
              id="patientCode" 
              value={formData.patientCode} 
              onChange={e => setFormData({ ...formData, patientCode: e.target.value })}
              placeholder="MAI-1234"
              required
            />
            <p className="text-xs text-gray-500">Si le patient n'existe pas, un patient de test sera créé pour la démo.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testName">Type d'analyse</Label>
            <Input 
              id="testName" 
              value={formData.testName} 
              onChange={e => setFormData({ ...formData, testName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testDate">Date de l'analyse</Label>
            <Input 
              id="testDate" 
              type="date"
              value={formData.testDate} 
              onChange={e => setFormData({ ...formData, testDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resultUrl">Lien du fichier (PDF)</Label>
            <Input 
              id="resultUrl" 
              type="url"
              value={formData.resultUrl} 
              onChange={e => setFormData({ ...formData, resultUrl: e.target.value })}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-[#126b43] text-white hover:bg-[#0c4e30]">
            {loading ? "Ajout en cours..." : "Lier le résultat au patient"}
          </Button>
        </form>
      </div>
    </div>
  )
}
