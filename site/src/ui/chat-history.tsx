import type { ChatConversationSummary } from "@/ui/chat-types"
import { cn } from "@/ui/cn"

function formatDate(date: Date | string | number, locale: string) {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(date))
}

/** L'historique des conversations : un titre et une date par ligne, la courante marquée. */
function ChatHistory({
  conversations,
  activeId,
  onSelect,
  locale = "fr-FR",
  className,
}: {
  conversations: ChatConversationSummary[]
  activeId?: string
  onSelect: (id: string) => void
  locale?: string
  className?: string
}) {
  if (!conversations.length) {
    return <p className={cn("px-3 py-6 text-center text-sm text-muted-foreground", className)}>Aucune conversation pour l'instant.</p>
  }

  return (
    <ul data-slot="chat-history" aria-label="Historique des conversations" className={cn("flex flex-col gap-1", className)}>
      {conversations.map((conversation) => {
        const current = conversation.id === activeId
        return (
          <li key={conversation.id}>
            <button
              type="button"
              aria-current={current ? "true" : undefined}
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "flex w-full flex-col items-start gap-0.5 rounded-xl px-3 py-2 text-left outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30",
                current && "bg-accent"
              )}
            >
              <span className="text-sm font-medium">{conversation.title}</span>
              <time dateTime={new Date(conversation.updatedAt).toISOString()} className="text-xs text-muted-foreground">
                {formatDate(conversation.updatedAt, locale)}
              </time>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export { ChatHistory }
