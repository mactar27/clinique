import { google } from "@ai-sdk/google"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: "Tu es l'assistant IA officiel de la Clinique MAIMOUNA à Rufisque. Réponds de manière concise, chaleureuse et très professionnelle aux questions des patients. Propose de prendre rendez-vous en ligne si la question porte sur une consultation. Tes informations : Ouvert 24h/24, 7j/7. Spécialités: Généraliste, Cardiologie, Gynécologie, Pédiatrie, Dermatologie, Ophtalmologie, Orthopédie, ORL, Urologie, Diabétologie. Services: Urgences, Laboratoire, Imagerie (Echographie, Radio), Maternité.",
    messages,
  })

  return result.toDataStreamResponse()
}
