import * as React from "react"
import { History, MessageSquarePlus } from "lucide-react"

import { Button } from "@/ui/button"
import { cn } from "@/ui/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"

/**
 * L'en-tête d'une conversation : l'accès à l'historique, le titre, puis les
 * actions (le sélecteur de modèle, par exemple) et « Nouvelle conversation ».
 * `history` est le contenu du panneau d'historique, ou une fonction qui reçoit
 * de quoi le fermer ; sans lui, le bouton n'apparaît pas.
 */
function ChatHeader({
  title,
  onNewConversation,
  history,
  children,
  className,
}: {
  title?: string
  onNewConversation: () => void
  history?: React.ReactNode | ((close: () => void) => React.ReactNode)
  children?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <header data-slot="chat-header" className={cn("flex flex-wrap items-center gap-2 border-b border-border px-4 py-2", className)}>
      {history && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Historique des conversations" />}>
            <History />
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 max-w-[calc(100vw-2rem)] gap-0 p-1">
            <div className="max-h-80 overflow-y-auto">{typeof history === "function" ? history(() => setOpen(false)) : history}</div>
          </PopoverContent>
        </Popover>
      )}
      {title && <h2 className="min-w-0 flex-1 truncate text-base">{title}</h2>}
      {!title && <span className="flex-1" />}
      {children}
      <Button variant="outline" size="sm" onClick={onNewConversation}>
        <MessageSquarePlus />
        Nouvelle conversation
      </Button>
    </header>
  )
}

export { ChatHeader }
