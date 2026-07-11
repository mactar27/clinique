"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { translations, type Lang, type TranslationKey } from "@/lib/i18n"

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("clinic-lang") : null
    if (stored === "fr" || stored === "wo") setLangState(stored)
  }, [])

  const setLang = (next: Lang) => {
    setLangState(next)
    if (typeof window !== "undefined") window.localStorage.setItem("clinic-lang", next)
  }

  const t = (key: TranslationKey) => translations[lang][key]

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
