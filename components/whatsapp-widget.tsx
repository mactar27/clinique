"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

export function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Petit délai avant l'apparition pour un effet plus naturel
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <a
      href="https://wa.me/221770000000" // Remplacer par le vrai numéro
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-5 duration-500"
      aria-label="Nous contacter sur WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      {/* Point de notification */}
      <span className="absolute right-0 top-0 block h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white" />
    </a>
  )
}
