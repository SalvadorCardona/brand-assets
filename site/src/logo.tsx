import type { SVGProps } from "react"

/**
 * Le glyphe Hermez, retracé d'après `projects/hermez/icon.png` : un H en traits
 * fins et trois plumes d'aile. Les plumes prennent la couleur primaire.
 */
export function HermezMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <g stroke="var(--primary)">
        <path d="M8 11.5c4 3.6 8.7 5.3 14 5.5" />
        <path d="M10 18c3.5 2.6 7.5 3.9 12 4" />
        <path d="M12.5 24.5c3 1.6 6.2 2.4 9.5 2.5" />
      </g>
      <g stroke="currentColor">
        <path d="M22 12v26" />
        <path d="M37 12v26" />
        <path d="M22 26h15" />
      </g>
    </svg>
  )
}

/** La marque en tête de la barre latérale : le glyphe, le nom de l'agence, le système. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm">
        <HermezMark className="size-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">Hermez</span>
        <span className="mt-1 text-[11px] text-muted-foreground">Design system</span>
      </span>
    </span>
  )
}
