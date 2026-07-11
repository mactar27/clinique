"use client"

import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card p-0.5 text-sm font-medium",
        className,
      )}
      role="group"
      aria-label="Choix de la langue"
    >
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={cn(
          "rounded-full px-3 py-1 transition-colors",
          lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLang("wo")}
        aria-pressed={lang === "wo"}
        className={cn(
          "rounded-full px-3 py-1 transition-colors",
          lang === "wo" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        WO
      </button>
    </div>
  )
}
