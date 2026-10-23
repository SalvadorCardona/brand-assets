import * as React from "react"
import { ArrowUp, Square } from "lucide-react"

import { Button } from "@/ui/button"
import { cn } from "@/ui/cn"

/**
 * La zone de saisie. Entrée envoie, Maj+Entrée passe à la ligne. Pendant la
 * génération, le bouton d'envoi devient un bouton d'arrêt.
 */
function ChatComposer({
  onSend,
  onStop,
  generating = false,
  disabled = false,
  placeholder = "Écrivez un message…",
  className,
}: {
  onSend: (text: string) => void
  onStop?: () => void
  generating?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}) {
  const [text, setText] = React.useState("")
  const field = React.useRef<HTMLTextAreaElement>(null)
  const hint = React.useId()
  const empty = !text.trim()

  // La zone grandit avec son contenu, jusqu'à une hauteur maximale.
  React.useLayoutEffect(() => {
    const element = field.current
    if (!element) return
    element.style.height = "auto"
    element.style.height = `${Math.min(element.scrollHeight, 200)}px`
  }, [text])

  function send() {
    if (empty || generating || disabled) return
    onSend(text.trim())
    setText("")
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Entrée qui valide une composition (IME) n'envoie pas.
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return
    event.preventDefault()
    send()
  }

  return (
    <form
      data-slot="chat-composer"
      onSubmit={(event) => {
        event.preventDefault()
        send()
      }}
      className={cn(
        "flex items-end gap-2 rounded-3xl border border-input bg-card p-2 pl-4 transition-[box-shadow,border-color] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
        className
      )}
    >
      <textarea
        ref={field}
        rows={1}
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Message"
        aria-describedby={hint}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={onKeyDown}
        className="max-h-[200px] min-h-9 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span id={hint} className="sr-only">
        Entrée pour envoyer, Maj+Entrée pour passer à la ligne.
      </span>
      {generating ? (
        <Button type="button" size="icon" variant="secondary" onClick={onStop} aria-label="Arrêter la génération">
          <Square className="fill-current" />
        </Button>
      ) : (
        <Button type="submit" size="icon" disabled={empty || disabled} aria-label="Envoyer">
          <ArrowUp />
        </Button>
      )}
    </form>
  )
}

export { ChatComposer }
