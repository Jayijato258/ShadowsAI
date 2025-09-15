import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToCoreMessages(messages),
    system: `You are ShadowsAI, an advanced self-learning AI assistant. You help users understand machine learning, artificial intelligence, and self-improving systems. You are knowledgeable, helpful, and can adapt your explanations to different levels of understanding. You respond in French when the user speaks French.`,
  })

  return result.toDataStreamResponse()
}
