"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

export function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#126b43] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#126b43] focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-5 duration-500"
        aria-label="Ouvrir le chat avec notre assistant"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-0 top-0 block h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-10 sm:w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#126b43] p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Assistant MAIMOUNA</h3>
            <p className="text-xs text-green-100">En ligne</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full p-2 hover:bg-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.length === 0 && (
          <div className="text-center text-sm text-gray-500 mt-4">
            Bonjour ! Je suis l'assistant virtuel de la Clinique MAIMOUNA. Comment puis-je vous aider aujourd'hui ?
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                m.role === "user"
                  ? "bg-[#126b43] text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-bl-none flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce delay-100">•</span>
              <span className="animate-bounce delay-200">•</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t bg-white p-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Posez votre question..."
          className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-[#126b43] focus:outline-none focus:ring-1 focus:ring-[#126b43]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#126b43] text-white disabled:opacity-50 hover:bg-[#0c4e30] transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
