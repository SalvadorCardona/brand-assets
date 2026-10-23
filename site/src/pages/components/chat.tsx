import { useEffect, useRef, useState, type ReactNode } from "react"
import { MessagesSquare, Moon, Sun } from "lucide-react"
import { Button } from "@/ui/button"
import { AgentProgress } from "@/ui/chat-progress"
import { ChatComposer } from "@/ui/chat-composer"
import { ChatConversation } from "@/ui/chat-conversation"
import { ChatHeader } from "@/ui/chat-header"
import { ChatHistory } from "@/ui/chat-history"
import { ChatCodeBlock, ChatMarkdown } from "@/ui/chat-markdown"
import { ChatMessage } from "@/ui/chat-message"
import { ChatModelSelector } from "@/ui/chat-model-selector"
import { TextPartView, ThinkingPartView, ToolApproval, ToolCallPartView, ToolResultPartView } from "@/ui/chat-parts"
import type { ChatConversationSummary, ChatMessageData, ChatModel, ToolCallPart, ToolResultPart } from "@/ui/chat-types"
import { CodeBlock, definePage, Example, Section } from "@/lib/doc"
import { installCommand } from "@/lib/registry"

/* Des données fictives, au format TanStack AI. Rien ne part vers un serveur. */

const models: ChatModel[] = [
  { id: "anthropic/claude-sonnet-5-5", name: "Claude Sonnet 5.5", provider: "Anthropic", inputPrice: 3, outputPrice: 15 },
  { id: "anthropic/claude-opus-5-5", name: "Claude Opus 5.5", provider: "Anthropic", inputPrice: 15, outputPrice: 75 },
  { id: "anthropic/claude-haiku-5-5", name: "Claude Haiku 5.5", provider: "Anthropic", inputPrice: 0.8, outputPrice: 4 },
  { id: "openai/gpt-5-mini", name: "GPT-5 mini, édition raisonnement longue durée", provider: "OpenAI", inputPrice: 0.25, outputPrice: 2 },
  { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", inputPrice: 0.3, outputPrice: 2.5 },
  { id: "mistralai/mistral-large", name: "Mistral Large", provider: "Mistral", inputPrice: 2, outputPrice: 6 },
]

const conversations: ChatConversationSummary[] = [
  { id: "c1", title: "Relancer le déploiement de Leadz", updatedAt: "2026-10-23T09:12:00" },
  { id: "c2", title: "Modèle d'e-mail : relance après démo", updatedAt: "2026-10-22T16:40:00" },
  { id: "c3", title: "Résumé des tickets de la semaine", updatedAt: "2026-10-19T11:05:00" },
]

const lookupCall: ToolCallPart = { type: "tool-call", id: "t1", name: "search_tickets", arguments: '{"status":"open","limit":3}', state: "input-complete" }
const lookupResult: ToolResultPart = { type: "tool-result", toolCallId: "t1", state: "complete", content: '[{"id":"BA-12","title":"Kit de chat IA"},{"id":"BA-9","title":"Favicons"}]' }

const call = (state: ToolCallPart["state"], extra: Partial<ToolCallPart> = {}): ToolCallPart => ({
  type: "tool-call",
  id: "t2",
  name: "deploy_service",
  arguments: '{"service":"leadz-api","environment":"production"}',
  state,
  ...extra,
})

const failedResult: ToolResultPart = {
  type: "tool-result",
  toolCallId: "t2",
  state: "error",
  content: "",
  error: "Le service leadz-api ne répond pas (délai dépassé après 30 s).",
}

const answer = `Voici les **tickets ouverts**, du plus récent au plus ancien :

1. \`BA-12\` : le kit de chat IA
2. \`BA-9\` : les favicons

Pour les relancer en script :

\`\`\`ts
const open = await tickets.list({ status: "open" })
console.log(open.length)
\`\`\`

> Les identifiants viennent de [l'outil de suivi](https://hermez.dev).`

const conversation: ChatMessageData[] = [
  { id: "m1", role: "user", parts: [{ type: "text", content: "Quels sont les tickets ouverts ?" }] },
  {
    id: "m2",
    role: "assistant",
    parts: [
      { type: "thinking", content: "Je cherche les tickets au statut « open », puis je les range par date." },
      lookupCall,
      lookupResult,
      { type: "text", content: answer },
    ],
  },
  { id: "m3", role: "user", parts: [{ type: "text", content: "Déploie leadz-api en production." }] },
  {
    id: "m4",
    role: "assistant",
    parts: [
      { type: "text", content: "Je prépare le déploiement. Il me faut ta validation." },
      call("approval-requested", { approval: { id: "a1", needsApproval: true } }),
    ],
  },
]

const reply = "Bien noté. Je continue avec **leadz-api**, puis je te dis dès que c'est en ligne."

/** Le thème sombre est une classe sur `<html>` : le bouton la pose le temps de la page. */
function useDarkMode() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    return () => document.documentElement.classList.remove("dark")
  }, [dark])
  return [dark, setDark] as const
}

function LiveDemo() {
  const [messages, setMessages] = useState(conversation)
  const [streaming, setStreaming] = useState(false)
  const [modelId, setModelId] = useState(models[0].id)
  const [activeId, setActiveId] = useState("c1")
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => () => clearInterval(timer.current), [])

  function approve(approvalId: string, approved: boolean) {
    setMessages((current) =>
      current.map((message) => ({
        ...message,
        parts: message.parts.map((part) =>
          part.type === "tool-call" && (part as ToolCallPart).approval?.id === approvalId
            ? { ...(part as ToolCallPart), state: "approval-responded", approval: { id: approvalId, needsApproval: true, approved } }
            : part
        ),
      }))
    )
  }

  function send(text: string) {
    const id = String(messages.length + 1)
    const user: ChatMessageData = { id, role: "user", parts: [{ type: "text", content: text }] }
    const assistant = (content: string): ChatMessageData => ({ id: `${id}-a`, role: "assistant", parts: [{ type: "text", content }] })
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setMessages([...messages, user, assistant(reply)])
      return
    }
    setMessages([...messages, user, assistant("")])
    setStreaming(true)
    let shown = 0
    timer.current = setInterval(() => {
      shown += 3
      setMessages((current) => [...current.slice(0, -1), assistant(reply.slice(0, shown))])
      if (shown >= reply.length) {
        clearInterval(timer.current)
        setStreaming(false)
      }
    }, 40)
  }

  function stop() {
    clearInterval(timer.current)
    setStreaming(false)
  }

  return (
    <div className="flex h-[640px] flex-col overflow-hidden rounded-2xl border border-border bg-background">
      <ChatHeader
        title="Déploiement de Leadz"
        onNewConversation={() => {
          stop()
          setMessages([])
        }}
        history={(close) => (
          <ChatHistory
            conversations={conversations}
            activeId={activeId}
            onSelect={(id) => {
              setActiveId(id)
              close()
            }}
          />
        )}
      >
        <ChatModelSelector models={models} value={modelId} onValueChange={setModelId} recentIds={[models[1].id, models[0].id]} />
      </ChatHeader>
      <ChatConversation empty={<p className="m-auto text-sm text-muted-foreground">Nouvelle conversation. Posez une question.</p>}>
        {messages.map((message, index) => (
          <ChatMessage key={message.id} message={message} streaming={streaming && index === messages.length - 1} onApprove={approve} />
        ))}
      </ChatConversation>
      <div className="mx-auto w-full max-w-3xl px-4 pb-4">
        <ChatComposer onSend={send} onStop={stop} generating={streaming} />
      </div>
    </div>
  )
}

const demos: { label: string; node: ReactNode }[] = [
  {
    label: "Texte en streaming (curseur) et texte terminé",
    node: (
      <div className="space-y-4">
        <TextPartView streaming part={{ type: "text", content: "Je regarde les **tickets** ouverts et je te résume" }} />
        <TextPartView part={{ type: "text", content: "Trois tickets restent ouverts, dont `BA-12`." }} />
      </div>
    ),
  },
  {
    label: "Réflexion : en cours (dépliée) et terminée (repliée)",
    node: (
      <div className="space-y-3">
        <ThinkingPartView streaming defaultOpen part={{ type: "thinking", content: "Je compare les deux tickets avant de répondre…" }} />
        <ThinkingPartView part={{ type: "thinking", content: "Le statut « open » suffit, inutile de filtrer par date." }} />
      </div>
    ),
  },
  {
    label: "Appel d'outil : en attente, en cours, terminé, erreur",
    node: (
      <div className="space-y-3">
        <ToolCallPartView part={call("awaiting-input", { arguments: "" })} />
        <ToolCallPartView part={call("input-streaming")} />
        <ToolCallPartView part={lookupCall} result={lookupResult} />
        <ToolCallPartView part={call("input-complete")} result={failedResult} />
      </div>
    ),
  },
  {
    label: "Demande de validation : en attente, approuvée, refusée",
    node: (
      <div className="space-y-3">
        <ToolCallPartView part={call("approval-requested", { approval: { id: "a1", needsApproval: true } })} onApprove={() => {}} />
        <ToolCallPartView part={call("approval-responded", { approval: { id: "a1", needsApproval: true, approved: true } })} />
        <ToolCallPartView part={call("approval-responded", { approval: { id: "a1", needsApproval: true, approved: false } })} />
        <div className="overflow-hidden rounded-xl border border-border">
          <ToolApproval toolName="delete_branch" onRespond={() => {}} className="border-t-0" />
        </div>
      </div>
    ),
  },
  {
    label: "Résultat d'outil : en cours, terminé, erreur",
    node: (
      <div className="space-y-3">
        <ToolResultPartView toolName="search_tickets" part={{ ...lookupResult, state: "streaming", content: '[{"id":"BA-12"' }} />
        <ToolResultPartView toolName="search_tickets" part={lookupResult} />
        <ToolResultPartView toolName="deploy_service" part={failedResult} />
      </div>
    ),
  },
  {
    label: "Markdown et bloc de code avec bouton Copier",
    node: (
      <div>
        <ChatMarkdown>{answer}</ChatMarkdown>
        <ChatCodeBlock language="bash" code="pnpm install && pnpm build" />
      </div>
    ),
  },
  {
    label: "Messages : utilisateur et assistant",
    node: (
      <div className="space-y-4">
        <ChatMessage message={conversation[0]} />
        <ChatMessage message={{ id: "x", role: "assistant", parts: [{ type: "text", content: "Une réponse **courte**." }] }} />
      </div>
    ),
  },
  {
    label: "Sélecteur de modèle",
    node: <ModelDemo />,
  },
  {
    label: "En-tête avec accès à l'historique",
    node: (
      <div className="overflow-hidden rounded-xl border border-border">
        <ChatHeader title="Modèle d'e-mail : relance" onNewConversation={() => {}} history={<ChatHistory conversations={conversations} activeId="c2" onSelect={() => {}} />} />
      </div>
    ),
  },
  {
    label: "Historique des conversations : avec contenu, vide",
    node: (
      <div className="grid gap-4 sm:grid-cols-2">
        <ChatHistory conversations={conversations} activeId="c1" onSelect={() => {}} />
        <ChatHistory conversations={[]} onSelect={() => {}} />
      </div>
    ),
  },
  {
    label: "Progression d'une tâche d'agent : déterminée, indéterminée, terminée",
    node: (
      <div className="space-y-5">
        <AgentProgress label="Analyse des 120 fiches" value={42} detail="50 fiches sur 120" />
        <AgentProgress label="Recherche en cours" detail="La durée n'est pas connue." />
        <AgentProgress label="Envoi terminé" value={100} />
      </div>
    ),
  },
]

function ModelDemo() {
  const [value, setValue] = useState(models[3].id)
  return <ChatModelSelector models={models} value={value} onValueChange={setValue} recentIds={[models[1].id, models[0].id]} />
}

const usage = `import { useChat } from "@tanstack/ai-react"
import { ChatComposer } from "@/ui/chat-composer"
import { ChatConversation } from "@/ui/chat-conversation"
import { ChatMessage } from "@/ui/chat-message"

export function Chat() {
  const { messages, sendMessage, stop, isLoading, addToolApprovalResponse } = useChat({ connection })

  return (
    <>
      <ChatConversation>
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            streaming={isLoading && index === messages.length - 1}
            onApprove={(id, approved) => addToolApprovalResponse({ id, approved })}
          />
        ))}
      </ChatConversation>
      <ChatComposer onSend={sendMessage} onStop={stop} generating={isLoading} />
    </>
  )
}`

export default definePage({
  id: "component-chat",
  name: "Chat IA",
  icon: MessagesSquare,
  intro: "Le kit de chat des produits Hermez : conversation, messages, parts TanStack AI, sélecteur de modèle, historique et progression d'agent. Présentationnel, sans back-end.",
  view: () => {
    const [dark, setDark] = useDarkMode()

    return (
      <>
        <Section
          title="Conversation"
          intro="Une conversation fictive, entièrement jouable : envoyez un message (Entrée), arrêtez la réponse, validez ou refusez le déploiement, changez de modèle."
        >
          <Button variant="outline" size="sm" aria-pressed={dark} onClick={() => setDark(!dark)}>
            {dark ? <Sun /> : <Moon />}
            {dark ? "Thème clair" : "Thème sombre"}
          </Button>
          <LiveDemo />
        </Section>
        <Section title="Chaque état" intro="Un exemple de chaque part et de chaque état, y compris l'erreur et la validation en attente.">
          {demos.map((demo) => (
            <Example key={demo.label} label={demo.label}>
              {demo.node}
            </Example>
          ))}
        </Section>
        <Section
          title="Format des données"
          intro="Les composants reçoivent des messages à la forme de TanStack AI : un message a des parts, une part a un type (text, thinking, tool-call, tool-result). Les parts d'autres types sont ignorées. Aucun composant n'appelle le réseau : les envois, l'arrêt et les validations remontent par des props."
        >
          <CodeBlock>{`message = { id, role: "user" | "assistant", parts: [
  { type: "text", content },
  { type: "thinking", content },
  { type: "tool-call", id, name, arguments, state, approval?, output? },
  { type: "tool-result", toolCallId, content, state: "streaming" | "complete" | "error", error? },
] }`}</CodeBlock>
        </Section>
        <Section title="Accessibilité" intro="La liste des messages est un journal (role=log) que le clavier fait défiler ; Entrée envoie, Maj+Entrée passe à la ligne ; le sélecteur se pilote aux flèches ; chaque état d'outil porte un libellé en plus de sa couleur. Avec prefers-reduced-motion, le curseur, les barres indéterminées, les rotations et le défilement lissé s'arrêtent." />
        <Section title="Installation" intro="Un item par composant, ou « chat » pour le kit entier, dans un projet où le style hermez est installé. Le thème sombre vient avec le style.">
          <CodeBlock>{installCommand("chat")}</CodeBlock>
        </Section>
        <Section title="Utilisation" intro={<>Sources : <code className="font-mono text-sm">src/ui/chat-*.tsx</code>. Branchement sur <code className="font-mono text-sm">useChat</code> :</>}>
          <CodeBlock>{usage}</CodeBlock>
        </Section>
      </>
    )
  },
})
