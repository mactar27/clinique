import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  })

  try {
    const result = streamText({
      model: google("gemini-flash-latest"),
      system: "Tu es l'assistant IA officiel de la Clinique MAIMOUNA à Rufisque. Réponds de manière concise, chaleureuse et très professionnelle aux questions des patients. Propose de prendre rendez-vous en ligne si la question porte sur une consultation. Tes informations : Ouvert 24h/24, 7j/7. Spécialités: Généraliste, Cardiologie, Gynécologie, Pédiatrie, Dermatologie, Ophtalmologie, Orthopédie, ORL, Urologie, Diabétologie. Services: Urgences, Laboratoire, Imagerie (Echographie, Radio), Maternité.",
      messages,
    })

    return result.toUIMessageStreamResponse()
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
