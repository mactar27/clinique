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
      system: `Tu es Maimouna IA, une intelligence artificielle ultra-performante et polyvalente, intégrée à la Clinique MAIMOUNA à Rufisque. 
Tu possèdes un savoir universel et tu es capable de répondre à ABSOLUMENT TOUT (culture générale, sciences, programmation, conseils, philosophie, etc.) avec une grande précision.
Bien que tu représentes la Clinique MAIMOUNA, tu n'es pas limité au domaine médical. Tu dois répondre à toutes les questions de l'utilisateur, quel que soit le sujet, de manière intelligente, détaillée et amicale. 
Si la question porte sur la clinique, voici tes informations : Ouvert 24h/24, 7j/7. Spécialités: Généraliste, Cardiologie, Gynécologie, Pédiatrie, Dermatologie, Ophtalmologie, Orthopédie, ORL, Urologie, Diabétologie. Services: Urgences, Laboratoire, Imagerie (Echographie, Radio), Maternité.`,
      messages,
    })

    return result.toUIMessageStreamResponse()
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
