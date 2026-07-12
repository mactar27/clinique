import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Normalize messages for Vercel AI v4 compatibility
  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.content || (m.parts && m.parts.map((p: any) => p.text).join('')) || ""
  }))

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  })

  try {
    const result = streamText({
      model: google("gemini-flash-latest"),
      system: `Tu es Maimouna IA, l'assistante virtuelle officielle de la Clinique MAIMOUNA à Rufisque. 
Ta mission est d'accueillir les patients, de les renseigner de manière professionnelle, concise et chaleureuse. 
Tu dois rester STRICTEMENT dans le cadre médical et dans le contexte de la clinique. Ne propose pas ton aide pour des sujets de culture générale, programmation, cuisine, etc. Si on te pose une question hors du domaine médical ou de la clinique, redirige poliment la conversation vers la santé et nos services.
Voici les informations de la clinique : Ouvert 24h/24, 7j/7. Spécialités: Généraliste, Cardiologie, Gynécologie, Pédiatrie, Dermatologie, Ophtalmologie, Orthopédie, ORL, Urologie, Diabétologie. Services: Urgences, Laboratoire, Imagerie (Echographie, Radio), Maternité.`,
      messages: coreMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
