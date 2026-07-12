"use client"

import { useState, useEffect, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react"

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
    sendMessage({ content: input, role: "user" })
    setInput("")
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#0d5032] to-[#126b43] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[#126b43]/50 focus:outline-none animate-in fade-in slide-in-from-bottom-5"
        aria-label="Ouvrir le chat avec notre assistant"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="absolute right-0 top-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[550px] w-[90vw] flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl shadow-[#126b43]/20 animate-in fade-in slide-in-from-bottom-10 sm:w-[400px] backdrop-blur-xl">
      {/* Header avec Glassmorphism */}
      <div className="relative flex items-center justify-between bg-gradient-to-r from-[#126b43] to-[#188a56] px-6 py-5 text-white">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shadow-inner">
            <Bot className="h-7 w-7 text-white" />
            <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-[#126b43]" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-wide">Maimouna IA</h3>
            <p className="flex items-center gap-1 text-xs font-medium text-green-100">
              <Sparkles className="h-3 w-3" /> Assistant Médical
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="relative z-10 rounded-full bg-white/10 p-2.5 transition-all hover:bg-white/30 hover:rotate-90"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
        {messages.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#126b43]/10 text-[#126b43]">
              <Bot className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium text-slate-500 max-w-[250px]">
              Bonjour ! Je suis l'intelligence artificielle de la Clinique. Je peux vous renseigner sur nos horaires, nos médecins et nos spécialités.
            </p>
          </div>
        )}
        
        {error && (
          <div className="mt-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
            Erreur: La clé API Gemini n'est pas configurée ou est invalide.
          </div>
        )}
        
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-3xl px-5 py-3 text-[15px] leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-gradient-to-tr from-[#126b43] to-[#188a56] text-white rounded-br-sm"
                  : "bg-white text-slate-800 border border-slate-100 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="max-w-[80%] rounded-3xl px-5 py-4 text-sm bg-white border border-slate-100 text-slate-800 rounded-bl-sm shadow-sm flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#126b43] animate-bounce"></span>
              <span className="h-2 w-2 rounded-full bg-[#126b43] animate-bounce [animation-delay:0.2s]"></span>
              <span className="h-2 w-2 rounded-full bg-[#126b43] animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="bg-white p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-slate-100"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 py-3 pl-5 pr-4 text-[15px] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#126b43]/30 transition-all shadow-inner"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#126b43] text-white shadow-md disabled:opacity-40 disabled:shadow-none hover:bg-[#0c4e30] transition-all hover:scale-105"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </div>
      </form>
    </div>
  )
}
