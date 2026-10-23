import * as React from "react"

import { TextPartView, ThinkingPartView, ToolCallPartView, ToolResultPartView } from "@/ui/chat-parts"
import type { ChatMessageData, ChatPart, ToolCallPart, ToolResultPart } from "@/ui/chat-types"
import { cn } from "@/ui/cn"

/**
 * Un message, rendu part par part. L'utilisateur parle dans une bulle, l'assistant
 * sur toute la largeur. `streaming` marque le message en cours de génération : sa
 * dernière part reçoit le curseur.
 */
function ChatMessage({
  message,
  streaming = false,
  onApprove,
  className,
}: {
  message: ChatMessageData
  streaming?: boolean
  onApprove?: (approvalId: string, approved: boolean) => void
  className?: string
}) {
  const parts = message.parts as ReadonlyArray<ChatPart>
  const calls = new Map<string, ToolCallPart>()
  const results = new Map<string, ToolResultPart>()
  for (const part of parts) {
    if (part.type === "tool-call") calls.set(part.id, part)
    if (part.type === "tool-result") results.set(part.toolCallId, part)
  }

  const isUser = message.role === "user"
  const last = parts.length - 1

  const content = parts.map((part, index): React.ReactNode => {
    const live = streaming && index === last
    switch (part.type) {
      case "text":
        return isUser ? (
          <p key={index} className="text-sm whitespace-pre-wrap break-words">{part.content}</p>
        ) : (
          <TextPartView key={index} part={part} streaming={live} />
        )
      case "thinking":
        return <ThinkingPartView key={index} part={part} streaming={live} defaultOpen={live} />
      case "tool-call":
        return <ToolCallPartView key={part.id} part={part} result={results.get(part.id)} onApprove={onApprove} />
      case "tool-result":
        return <ToolResultPartView key={`${part.toolCallId}-result`} part={part} toolName={calls.get(part.toolCallId)?.name} />
      default:
        return null
    }
  })

  return (
    <article
      data-slot="chat-message"
      data-role={message.role}
      aria-label={isUser ? "Vous" : "Assistant"}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "flex min-w-0 flex-col gap-3",
          isUser ? "max-w-[85%] rounded-3xl rounded-br-lg bg-primary px-4 py-2.5 text-primary-foreground" : "w-full"
        )}
      >
        {content}
      </div>
    </article>
  )
}

export { ChatMessage }
