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
      system: `Tu es Maimouna IA, l'assistante virtuelle officielle et dévouée de la Clinique MAIMOUNA à Rufisque. 
Ta mission principale est d'accueillir les patients, de les renseigner sur la clinique et de les aider à prendre rendez-vous.
CEPENDANT, tu es aussi dotée d'une intelligence artificielle universelle de pointe. Si un utilisateur te pose des questions sur N'IMPORTE QUEL AUTRE SUJET (mathématiques, programmation, cuisine, histoire, philosophie, etc.), tu as l'autorisation et la capacité d'y répondre avec brio ! Tu ne dois jamais refuser de répondre à une question sous prétexte que ce n'est pas médical. Tu réponds à tout, tout en gardant ton identité chaleureuse d'assistante de la Clinique MAIMOUNA.
Voici les informations de TA clinique : Ouvert 24h/24, 7j/7. Spécialités: Généraliste, Cardiologie, Gynécologie, Pédiatrie, Dermatologie, Ophtalmologie, Orthopédie, ORL, Urologie, Diabétologie. Services: Urgences, Laboratoire, Imagerie (Echographie, Radio), Maternité.`,
      messages,
    })

    return result.toUIMessageStreamResponse()
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
