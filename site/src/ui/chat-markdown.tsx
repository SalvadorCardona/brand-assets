import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/ui/button"
import { cn } from "@/ui/cn"

/** Un bloc de code et son bouton « Copier ». */
function ChatCodeBlock({
  code,
  language,
  className,
}: {
  code: string
  language?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      data-slot="chat-code-block"
      className={cn("my-3 overflow-hidden rounded-xl border border-border bg-muted/60", className)}
    >
      <div className="flex items-center justify-between border-b border-border py-1 pr-1 pl-3">
        <span className="font-mono text-xs text-muted-foreground">{language || "texte"}</span>
        <Button variant="ghost" size="xs" onClick={copy}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copié" : "Copier"}
        </Button>
        <span className="sr-only" role="status">
          {copied ? "Code copié dans le presse-papiers" : ""}
        </span>
      </div>
      <pre tabIndex={0} className="overflow-x-auto p-3 font-mono text-sm leading-relaxed outline-none focus-visible:ring-3 focus-visible:ring-ring/30">
        <code>{code}</code>
      </pre>
    </div>
  )
}

const inlinePattern = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\[[^\]\n]+\]\([^)\s]+\))|(\*[^*\n]+\*)|(_[^_\n]+_)/g

function isSafeUrl(url: string) {
  return /^(https?:|mailto:|\/|#)/i.test(url)
}

/** Le Markdown en ligne : code, gras, italique et liens. Jamais de HTML brut. */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(inlinePattern)) {
    const index = match.index
    if (index > last) nodes.push(text.slice(last, index))
    const token = match[0]
    const key = index

    if (match[1]) {
      nodes.push(
        <code key={key} className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
          {token.slice(1, -1)}
        </code>
      )
    } else if (match[2]) {
      nodes.push(<strong key={key}>{renderInline(token.slice(2, -2))}</strong>)
    } else if (match[3]) {
      const split = token.indexOf("](")
      const label = token.slice(1, split)
      const url = token.slice(split + 2, -1)
      nodes.push(
        isSafeUrl(url) ? (
          <a key={key} href={url} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4 hover:no-underline">
            {label}
          </a>
        ) : (
          label
        )
      )
    } else {
      nodes.push(<em key={key}>{renderInline(token.slice(1, -1))}</em>)
    }
    last = index + token.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

const fence = /^```\s*([\w+#.-]*)\s*$/
const heading = /^(#{1,6})\s+(.*)$/
const bullet = /^\s*[-*+]\s+(.*)$/
const ordered = /^\s*\d+[.)]\s+(.*)$/

/**
 * Rend du Markdown (titres, listes, citations, code) en éléments React. Tolère
 * le texte tronqué d'un streaming : un bloc de code non fermé s'affiche tel quel.
 */
function ChatMarkdown({ children, className }: { children: string; className?: string }) {
  const lines = children.replace(/\r\n/g, "\n").split("\n")
  const blocks: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const key = blocks.length

    if (!line.trim()) {
      i++
      continue
    }

    const open = line.match(fence)
    if (open) {
      const code: string[] = []
      i++
      while (i < lines.length && !fence.test(lines[i])) code.push(lines[i++])
      i++
      blocks.push(<ChatCodeBlock key={key} code={code.join("\n")} language={open[1]} />)
      continue
    }

    const title = line.match(heading)
    if (title) {
      const level = Math.min(title[1].length + 2, 6) as 3 | 4 | 5 | 6
      const Tag = `h${level}` as const
      blocks.push(
        <Tag key={key} className="mt-4 mb-2 text-base">
          {renderInline(title[2])}
        </Tag>
      )
      i++
      continue
    }

    if (/^\s*([-*_])\s*\1\s*\1[\s\-*_]*$/.test(line)) {
      blocks.push(<hr key={key} className="my-4 border-border" />)
      i++
      continue
    }

    if (line.startsWith(">")) {
      const quote: string[] = []
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""))
      blocks.push(
        <blockquote key={key} className="my-3 border-l-2 border-primary/40 pl-3 text-muted-foreground">
          {renderInline(quote.join(" "))}
        </blockquote>
      )
      continue
    }

    const isOrdered = ordered.test(line)
    if (isOrdered || bullet.test(line)) {
      const pattern = isOrdered ? ordered : bullet
      const items: string[] = []
      while (i < lines.length && pattern.test(lines[i])) items.push(lines[i++].match(pattern)![1])
      const List = isOrdered ? "ol" : "ul"
      blocks.push(
        <List key={key} className={cn("my-3 space-y-1 pl-6", isOrdered ? "list-decimal" : "list-disc")}>
          {items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </List>
      )
      continue
    }

    const paragraph: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !fence.test(lines[i]) &&
      !heading.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !bullet.test(lines[i]) &&
      !ordered.test(lines[i])
    ) {
      paragraph.push(lines[i++])
    }
    blocks.push(
      <p key={key} className="my-3 leading-relaxed">
        {renderInline(paragraph.join(" "))}
      </p>
    )
  }

  return (
    <div data-slot="chat-markdown" className={cn("text-sm break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}>
      {blocks}
    </div>
  )
}

export { ChatCodeBlock, ChatMarkdown }
