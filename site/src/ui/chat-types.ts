/*
 * Les types du kit de chat. Ils reprennent la forme des messages de TanStack AI
 * (`@tanstack/ai-react`, `useChat`) : un message a des `parts`, une part a un
 * `type`. Les composants ne dépendent pas du paquet, seulement de cette forme.
 */

export type ToolCallState =
  | "awaiting-input"
  | "input-streaming"
  | "input-complete"
  | "approval-requested"
  | "approval-responded"

export interface TextPart {
  type: "text"
  content: string
}

export interface ThinkingPart {
  type: "thinking"
  content: string
}

export interface ToolCallPart {
  type: "tool-call"
  id: string
  name: string
  /** Les arguments, en JSON, éventuellement incomplet pendant le streaming. */
  arguments: string
  state: ToolCallState
  approval?: { id: string; needsApproval: boolean; approved?: boolean }
  output?: unknown
}

export interface ToolResultPart {
  type: "tool-result"
  toolCallId: string
  content: string
  state: "streaming" | "complete" | "error"
  error?: string
}

export type ChatPart = TextPart | ThinkingPart | ToolCallPart | ToolResultPart

export interface ChatMessageData {
  id: string
  role: "system" | "user" | "assistant"
  /** Les parts d'autres types (image, audio…) sont ignorées à l'affichage. */
  parts: ReadonlyArray<ChatPart | { type: string }>
  createdAt?: Date
}

/** L'état d'un appel d'outil, tel qu'on l'affiche. */
export type ToolStatus = "pending" | "running" | "done" | "error" | "approval" | "denied"

/** Déduit l'état affiché d'un appel d'outil de son état TanStack AI et de son résultat. */
export function toolStatus(call: ToolCallPart, result?: ToolResultPart): ToolStatus {
  if (result?.state === "error") return "error"
  if (result?.state === "complete" || call.output !== undefined) return "done"
  if (call.state === "approval-requested") return "approval"
  if (call.approval?.approved === false) return "denied"
  if (call.state === "awaiting-input") return "pending"
  return "running"
}

export interface ChatModel {
  id: string
  name: string
  provider: string
  /** Prix en dollars par million de tokens. */
  inputPrice?: number
  outputPrice?: number
}

export interface ChatConversationSummary {
  id: string
  title: string
  updatedAt: Date | string | number
}
