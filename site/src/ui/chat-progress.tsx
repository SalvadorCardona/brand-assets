import { cn } from "@/ui/cn"

/**
 * La progression d'une tâche d'agent. Avec `value` (0 à 100), la barre est
 * déterminée ; sans, elle est indéterminée et ne bouge que si l'on accepte
 * l'animation.
 */
function AgentProgress({
  label,
  value,
  detail,
  className,
}: {
  label: string
  value?: number
  detail?: string
  className?: string
}) {
  const determinate = value !== undefined
  const percent = determinate ? Math.min(100, Math.max(0, Math.round(value))) : undefined

  return (
    <div data-slot="agent-progress" className={cn("space-y-2 text-sm", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground tabular-nums">{determinate ? `${percent} %` : "En cours…"}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={determinate ? `${percent} %` : "En cours"}
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn(
            "h-full rounded-full bg-primary",
            determinate ? "motion-safe:transition-[width] motion-safe:duration-300" : "w-full opacity-60 motion-safe:animate-pulse"
          )}
          style={determinate ? { width: `${percent}%` } : undefined}
        />
      </div>
      {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
    </div>
  )
}

export { AgentProgress }
