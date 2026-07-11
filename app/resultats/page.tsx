"use client"

import { useState } from "react"
import { getTestResultsByCode } from "@/lib/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Download, Lock } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function PatientResultsPage() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await getTestResultsByCode(code)
      if (res && res.patient) {
        setData(res)
      } else {
        setError(true)
      }
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#126b43] font-heading">Portail Patient</h1>
        <p className="mt-2 text-gray-500">
          Consultez et téléchargez vos résultats d'analyses en toute sécurité.
        </p>
      </div>

      {!data ? (
        <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#126b43]/10 text-[#126b43]">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-center block">Entrez votre code secret patient</Label>
              <Input 
                id="code" 
                value={code} 
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="Ex: MAI-1234"
                className="text-center text-lg uppercase tracking-widest"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">Aucun dossier trouvé pour ce code.</p>
            )}
            <Button type="submit" disabled={loading} className="w-full bg-[#126b43] text-white hover:bg-[#0c4e30] py-6 text-lg rounded-xl">
              {loading ? "Vérification..." : "Accéder à mes résultats"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Dossier de {data.patient.firstName} {data.patient.lastName}</h2>
              <p className="text-sm text-gray-500">Code: {data.patient.patientCode}</p>
            </div>
            <Button variant="outline" onClick={() => setData(null)}>Déconnexion</Button>
          </div>

          <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4 bg-gray-50">
              <h3 className="font-semibold text-gray-700">Vos derniers résultats</h3>
            </div>
            <div className="divide-y divide-border">
              {data.results.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Aucun résultat disponible pour le moment.</div>
              ) : (
                data.results.map((res: any) => (
                  <div key={res.id} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#126b43]/10 text-[#126b43]">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{res.testName}</p>
                        <p className="text-sm text-gray-500">Fait le {format(new Date(res.testDate), 'dd MMM yyyy', { locale: fr })}</p>
                      </div>
                    </div>
                    <a href={res.resultUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2 text-[#126b43] border-[#126b43]/20 hover:bg-[#126b43]/5">
                        <Download className="h-4 w-4" />
                        Télécharger PDF
                      </Button>
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
