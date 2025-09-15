import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: openai.responses("gpt-4o-mini"),
    prompt,
    abortSignal: req.signal,
    system: `You are an AI learning assistant that helps explain concepts and provides insights about machine learning, artificial intelligence, and self-improving systems. You are knowledgeable, helpful, and can adapt your explanations to different levels of understanding.`,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("Aborted")
      }
    },
  })
}
