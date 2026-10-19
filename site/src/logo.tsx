import { HermezMark } from "@/identity/hermez-mark"

/** La marque en tête de la barre latérale : le symbole, le nom de l'agence, le système. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <HermezMark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">Hermez</span>
        <span className="mt-1 text-[11px] text-muted-foreground">Design system</span>
      </span>
    </span>
  )
}
