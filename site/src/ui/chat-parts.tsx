import * as React from "react"
import {
  Brain,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Loader2,
  ShieldQuestion,
  Wrench,
  XCircle,
} from "lucide-react"

import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { ChatMarkdown } from "@/ui/chat-markdown"
import { toolStatus, type ThinkingPart, type TextPart, type ToolCallPart, type ToolResultPart, type ToolStatus } from "@/ui/chat-types"
import { cn } from "@/ui/cn"

/** Le curseur d'un texte en cours de génération. Fixe si l'on préfère moins d'animation. */
function Caret() {
  return <span aria-hidden className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 rounded-sm bg-primary motion-safe:animate-pulse" />
}

/** Une part de texte, rendue en Markdown ; le curseur clignote tant que le texte arrive. */
function TextPartView({ part, streaming, className }: { part: TextPart; streaming?: boolean; className?: string }) {
  return (
    <div data-slot="chat-text-part" className={className}>
      <ChatMarkdown>{part.content}</ChatMarkdown>
      {streaming && <Caret />}
    </div>
  )
}

/** La réflexion du modèle, repliable. Dépliée pendant qu'elle arrive. */
function ThinkingPartView({
  part,
  streaming,
  defaultOpen,
  className,
}: {
  part: ThinkingPart
  streaming?: boolean
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen ?? false)
  const id = React.useId()

  return (
    <div data-slot="chat-thinking-part" className={cn("rounded-xl border border-border bg-muted/40 text-sm", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        <ChevronRight className={cn("size-4 shrink-0 motion-safe:transition-transform", open && "rotate-90")} aria-hidden />
        <Brain className="size-4 shrink-0" aria-hidden />
        <span className="font-medium">{streaming ? "Réflexion en cours…" : "Réflexion"}</span>
      </button>
      {open && (
        <div id={id} className="border-t border-border px-3 py-2 whitespace-pre-wrap text-muted-foreground">
          {part.content}
          {streaming && <Caret />}
        </div>
      )}
    </div>
  )
}

const statuses: Record<ToolStatus, { label: string; icon: React.ReactNode; variant: React.ComponentProps<typeof Badge>["variant"] }> = {
  pending: { label: "En attente", icon: <CircleDashed />, variant: "secondary" },
  running: { label: "En cours", icon: <Loader2 className="motion-safe:animate-spin" />, variant: "info" },
  done: { label: "Terminé", icon: <CheckCircle2 />, variant: "success" },
  error: { label: "Erreur", icon: <XCircle />, variant: "destructive" },
  approval: { label: "Validation requise", icon: <ShieldQuestion />, variant: "warning" },
  denied: { label: "Refusé", icon: <XCircle />, variant: "secondary" },
}

/** L'état d'un appel d'outil : une icône et un libellé, jamais la couleur seule. */
function ToolStatusBadge({ status }: { status: ToolStatus }) {
  const { label, icon, variant } = statuses[status]
  return (
    <Badge variant={variant} data-status={status}>
      {icon}
      {label}
    </Badge>
  )
}

/** Met en forme un JSON, ou rend le texte tel quel s'il n'en est pas (ou pas encore). */
function pretty(text: string) {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

/** La demande de validation d'un outil, avec ses boutons Approuver et Refuser. */
function ToolApproval({
  toolName,
  onRespond,
  className,
}: {
  toolName: string
  onRespond: (approved: boolean) => void
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={`Validation de l'outil ${toolName}`}
      data-slot="chat-tool-approval"
      className={cn("flex flex-wrap items-center justify-between gap-3 border-t border-border bg-accent px-3 py-2", className)}
    >
      <p className="text-sm">
        L'assistant demande à utiliser <code className="font-mono">{toolName}</code>.
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onRespond(false)}>
          Refuser
        </Button>
        <Button size="sm" onClick={() => onRespond(true)}>
          Approuver
        </Button>
      </div>
    </div>
  )
}

/** Un appel d'outil : son nom, son état, ses arguments, et la validation attendue. */
function ToolCallPartView({
  part,
  result,
  onApprove,
  className,
}: {
  part: ToolCallPart
  /** Le résultat de cet appel, s'il est déjà arrivé : il fixe l'état affiché. */
  result?: ToolResultPart
  /** Appelée avec l'identifiant de la demande de validation et la réponse. */
  onApprove?: (approvalId: string, approved: boolean) => void
  className?: string
}) {
  const status = toolStatus(part, result)
  const id = React.useId()

  return (
    <div data-slot="chat-tool-call" data-status={status} className={cn("overflow-hidden rounded-xl border border-border bg-card text-sm", className)}>
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <span className="flex min-w-0 items-center gap-2">
          <Wrench className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="truncate font-mono font-medium">{part.name}</span>
        </span>
        <ToolStatusBadge status={status} />
      </div>
      {part.arguments && (
        <pre
          id={id}
          tabIndex={0}
          aria-label={`Arguments de ${part.name}`}
          className="max-h-48 overflow-auto border-t border-border bg-muted/40 px-3 py-2 font-mono text-xs leading-relaxed outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          {pretty(part.arguments)}
        </pre>
      )}
      {status === "approval" && part.approval && onApprove && (
        <ToolApproval toolName={part.name} onRespond={(approved) => onApprove(part.approval!.id, approved)} />
      )}
    </div>
  )
}

/** Le résultat d'un outil : le contenu renvoyé, ou l'erreur. */
function ToolResultPartView({
  part,
  toolName,
  className,
}: {
  part: ToolResultPart
  toolName?: string
  className?: string
}) {
  const failed = part.state === "error"

  return (
    <div
      data-slot="chat-tool-result"
      data-state={part.state}
      className={cn("overflow-hidden rounded-xl border bg-card text-sm", failed ? "border-destructive/40" : "border-border", className)}
    >
      <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
        {failed ? (
          <XCircle className="size-4 shrink-0 text-destructive" aria-hidden />
        ) : part.state === "streaming" ? (
          <Loader2 className="size-4 shrink-0 motion-safe:animate-spin" aria-hidden />
        ) : (
          <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden />
        )}
        <span className="font-medium text-foreground">{failed ? "Échec du résultat" : "Résultat"}</span>
        {toolName && <code className="font-mono text-xs">{toolName}</code>}
      </div>
      <pre
        tabIndex={0}
        aria-label={toolName ? `Résultat de ${toolName}` : "Résultat de l'outil"}
        className={cn(
          "max-h-64 overflow-auto border-t px-3 py-2 font-mono text-xs leading-relaxed whitespace-pre-wrap outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
          failed ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-muted/40"
        )}
      >
        {failed ? part.error || part.content : pretty(part.content)}
        {part.state === "streaming" && <Caret />}
      </pre>
    </div>
  )
}

export { Caret, TextPartView, ThinkingPartView, ToolApproval, ToolCallPartView, ToolResultPartView, ToolStatusBadge }
