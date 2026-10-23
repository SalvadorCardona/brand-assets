import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { Button } from "@/ui/button"
import type { ChatModel } from "@/ui/chat-types"
import { cn } from "@/ui/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"

interface Section {
  label: string
  models: ChatModel[]
}

function formatPrice(model: ChatModel) {
  if (model.inputPrice === undefined || model.outputPrice === undefined) return undefined
  const money = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD", currencyDisplay: "narrowSymbol", maximumFractionDigits: 2 })
  return `${money.format(model.inputPrice)} / ${money.format(model.outputPrice)} par M tokens`
}

/**
 * Le sélecteur de modèle. Chaque modèle tient sur deux lignes : son nom en entier,
 * puis son identifiant et son prix. Une recherche filtre la liste, que les modèles
 * récents précèdent avant les fournisseurs. Flèches, Entrée et Échap au clavier.
 */
function ChatModelSelector({
  models,
  value,
  onValueChange,
  recentIds = [],
  className,
}: {
  models: ChatModel[]
  value: string
  onValueChange: (id: string) => void
  recentIds?: string[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const listId = React.useId()
  const selected = models.find((model) => model.id === value)

  const sections = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matches = models.filter((model) => !needle || `${model.name} ${model.id} ${model.provider}`.toLowerCase().includes(needle))
    const result: Section[] = []

    // Les récents ne s'affichent qu'en l'absence de recherche.
    if (!needle) {
      const recents = recentIds.flatMap((id) => matches.find((model) => model.id === id) ?? [])
      if (recents.length) result.push({ label: "Récents", models: recents })
    }
    for (const provider of [...new Set(matches.map((model) => model.provider))]) {
      result.push({ label: provider, models: matches.filter((model) => model.provider === provider) })
    }
    return result
  }, [models, query, recentIds])

  const flat = sections.flatMap((section, s) => section.models.map((model) => ({ model, key: `${listId}-${s}-${model.id}` })))
  const activeIndex = Math.min(active, flat.length - 1)

  function choose(model: ChatModel) {
    onValueChange(model.id)
    setOpen(false)
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      if (flat.length) setActive((activeIndex + (event.key === "ArrowDown" ? 1 : -1) + flat.length) % flat.length)
    } else if (event.key === "Enter" && flat[activeIndex]) {
      event.preventDefault()
      choose(flat[activeIndex].model)
    }
  }

  React.useEffect(() => {
    document.getElementById(flat[activeIndex]?.key ?? "")?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, query]) // `flat` change à chaque rendu : seuls l'index et la recherche déplacent la sélection

  let position = -1

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) {
          setQuery("")
          setActive(Math.max(0, models.findIndex((model) => model.id === value)))
        }
      }}
    >
      <PopoverTrigger render={<Button variant="outline" size="sm" className={cn("max-w-64", className)} />}>
        <span className="truncate">{selected?.name ?? "Choisir un modèle"}</span>
        <ChevronsUpDown className="opacity-60" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 max-w-[calc(100vw-2rem)] gap-0 p-0">
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            role="combobox"
            aria-expanded
            aria-controls={`${listId}-list`}
            aria-activedescendant={flat[activeIndex]?.key}
            aria-label="Rechercher un modèle"
            placeholder="Rechercher un modèle…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div id={`${listId}-list`} role="listbox" aria-label="Modèles" className="max-h-80 overflow-y-auto p-1">
          {sections.map((section, s) => (
            <div key={section.label} role="group" aria-labelledby={`${listId}-label-${s}`}>
              <p id={`${listId}-label-${s}`} className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">
                {section.label}
              </p>
              {section.models.map((model) => {
                const index = ++position
                const price = formatPrice(model)
                return (
                  <div
                    key={model.id}
                    id={flat[index].key}
                    role="option"
                    aria-selected={model.id === value}
                    data-active={index === activeIndex || undefined}
                    onClick={() => choose(model)}
                    onPointerMove={() => setActive(index)}
                    className="flex cursor-pointer items-start gap-2 rounded-xl px-3 py-2 data-active:bg-muted"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{model.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        <code className="font-mono break-all">{model.id}</code>
                        {price && <span> · {price}</span>}
                      </p>
                    </div>
                    {model.id === value && <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />}
                  </div>
                )
              })}
            </div>
          ))}
          {!flat.length && <p className="px-3 py-6 text-center text-sm text-muted-foreground">Aucun modèle ne correspond.</p>}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ChatModelSelector }
