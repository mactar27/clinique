"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAdmin } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Stethoscope, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await loginAdmin(password)

    if (result.success) {
      router.push("/admin")
      router.refresh()
    } else {
      setError(result.error || "Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 p-4 sm:p-8">
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-[#126b43]/5">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#126b43]/10 text-[#126b43]">
            <Stethoscope className="size-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Espace Sécurisé
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Clinique MAIMOUNA - Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mot de passe administrateur
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
              required
            />
            {error && (
              <p className="text-sm font-medium text-red-500">
                {error}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading || !password}
            className="h-11 w-full bg-[#126b43] hover:bg-[#0c5936] text-white"
          >
            {loading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : null}
            Se connecter
          </Button>
        </form>
      </div>
      
      <p className="mt-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} WockyTech. Tous droits réservés.
      </p>
    </div>
  )
}
