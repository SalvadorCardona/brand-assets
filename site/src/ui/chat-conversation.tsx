import * as React from "react"
import { ArrowDown } from "lucide-react"

import { Button } from "@/ui/button"
import { cn } from "@/ui/cn"

/** Sous ce seuil, en pixels, du bas de la liste, on la considère suivie. */
const STICK_THRESHOLD = 48

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * La liste des messages d'une conversation. Elle suit le bas tant que l'on n'a pas
 * remonté (le streaming la fait grandir), et propose de revenir au dernier message
 * sinon. Les messages sont ses enfants ; la zone de saisie se place dessous.
 */
function ChatConversation({
  children,
  empty,
  className,
}: {
  children?: React.ReactNode
  /** Ce qu'on affiche quand il n'y a aucun message. */
  empty?: React.ReactNode
  className?: string
}) {
  const scroller = React.useRef<HTMLDivElement>(null)
  const content = React.useRef<HTMLDivElement>(null)
  const stuck = React.useRef(true)
  const [atBottom, setAtBottom] = React.useState(true)

  const toBottom = React.useCallback((smooth: boolean) => {
    const element = scroller.current
    if (element) element.scrollTo({ top: element.scrollHeight, behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto" })
  }, [])

  React.useEffect(() => {
    const element = content.current
    if (!element || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(() => {
      if (stuck.current) toBottom(false)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [toBottom])

  function onScroll() {
    const element = scroller.current
    if (!element) return
    const near = element.scrollHeight - element.scrollTop - element.clientHeight <= STICK_THRESHOLD
    stuck.current = near
    setAtBottom(near)
  }

  const hasMessages = React.Children.count(children) > 0

  return (
    <div data-slot="chat-conversation" className={cn("relative flex min-h-0 flex-1 flex-col", className)}>
      <div
        ref={scroller}
        role="log"
        tabIndex={0}
        aria-label="Conversation"
        aria-live="polite"
        aria-relevant="additions text"
        onScroll={onScroll}
        className="flex-1 overflow-y-auto outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        <div ref={content} className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-6 px-4 py-6">
          {hasMessages ? children : empty}
        </div>
      </div>
      {!atBottom && (
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 shadow-md"
          onClick={() => {
            stuck.current = true
            toBottom(true)
          }}
        >
          <ArrowDown />
          Dernier message
        </Button>
      )}
    </div>
  )
}

export { ChatConversation }
