"use client"

import { useState, useEffect, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import { Stethoscope, X, Send, Sparkles } from "lucide-react"

export function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const { messages, sendMessage, status, error } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLoading = status === "submitted" || status === "streaming"

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage({ parts: [{ type: "text", text: input }], role: "user" })
    setInput("")
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#126b43] to-[#20c977] text-white shadow-[0_0_40px_rgba(32,201,119,0.4)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(32,201,119,0.6)] focus:outline-none group"
        aria-label="Ouvrir le chat avec notre assistant"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
        <Stethoscope className="h-8 w-8 relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
        <span className="absolute right-0 top-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-slate-900"></span>
        </span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[90vw] flex-col overflow-hidden rounded-[2rem] border border-[#126b43]/10 bg-white/90 shadow-[0_20px_80px_rgba(18,107,67,0.15)] backdrop-blur-3xl animate-in zoom-in-95 slide-in-from-bottom-10 sm:w-[420px] duration-300">
      {/* Premium Header */}
      <div className="relative flex items-center justify-between border-b border-[#126b43]/10 bg-white/50 px-6 py-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#126b43]/5 to-[#188a56]/5"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#126b43]/10 to-[#188a56]/10 border border-[#126b43]/20 shadow-[0_0_15px_rgba(18,107,67,0.1)]">
            <Stethoscope className="h-6 w-6 text-[#126b43]" />
            <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-[#20c977] ring-2 ring-white shadow-[0_0_10px_rgba(32,201,119,0.5)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-wide text-slate-800">Maimouna IA</h3>
            <p className="flex items-center gap-1.5 text-xs font-medium text-[#126b43] uppercase tracking-wider">
              <Sparkles className="h-3 w-3" /> Assistant Médical
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="relative z-10 rounded-full bg-[#126b43]/5 p-2.5 text-slate-500 transition-all hover:bg-[#126b43]/10 hover:text-[#126b43] hover:rotate-90"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#126b43]/10 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center space-y-5 text-center animate-in fade-in duration-700">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#126b43]/10 to-[#20c977]/10 border border-[#126b43]/10 shadow-[0_0_30px_rgba(18,107,67,0.05)]">
              <Stethoscope className="h-10 w-10 text-[#126b43]" />
            </div>
            <p className="text-sm font-medium text-slate-500 max-w-[260px] leading-relaxed">
              Bonjour ! Je suis Maimouna, l'IA de la Clinique. Posez-moi vos questions, je suis à votre écoute 24h/24.
            </p>
          </div>
        )}
        
        {error && (
          <div className="mt-2 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-2xl backdrop-blur-md flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
            Erreur: Impossible de contacter le serveur.
          </div>
        )}
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full animate-in slide-in-from-bottom-2 fade-in duration-300 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-[24px] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-gradient-to-tr from-[#126b43] to-[#20c977] text-white rounded-br-sm shadow-[0_5px_15px_rgba(18,107,67,0.15)]"
                  : "bg-white border border-[#126b43]/5 text-slate-700 rounded-bl-sm"
              }`}
            >
              {(m.parts && m.parts.map((p, i) => p.type === 'text' ? p.text : '').join('')) || JSON.stringify(m)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex w-full justify-start animate-in fade-in zoom-in-95 duration-300">
            <div className="max-w-[80%] rounded-[24px] px-5 py-4 text-sm bg-white border border-[#126b43]/5 text-slate-700 rounded-bl-sm shadow-sm flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#126b43]/50 animate-bounce"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#126b43]/50 animate-bounce [animation-delay:0.15s]"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#126b43]/50 animate-bounce [animation-delay:0.3s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input Area */}
      <form
        onSubmit={onSubmit}
        className="bg-white/50 p-5 backdrop-blur-md border-t border-[#126b43]/5"
      >
        <div className="flex items-center gap-3 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-full border border-slate-200 bg-white py-3.5 pl-6 pr-14 text-[15px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#126b43]/30 transition-all shadow-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#126b43] to-[#20c977] text-white shadow-lg disabled:opacity-30 disabled:scale-95 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(32,201,119,0.4)]"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </div>
      </form>
    </div>
  )
}
