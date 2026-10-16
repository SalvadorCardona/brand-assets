import { Layers } from "lucide-react"

/** La marque en tête de la barre latérale : un glyphe de ligne et le nom du système. */
export function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-7 items-center justify-center rounded-lg bg-background text-primary">
        <Layers className="size-4" />
      </span>
      Design system
    </span>
  )
}
