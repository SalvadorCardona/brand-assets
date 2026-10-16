import { useEffect, useState, type ReactNode } from "react"
import { createViewResource, type IconType } from "react-resource-view"

/** Le titre d'une page : un h1 et son chapeau. */
export function PageHeader({ title, intro }: { title: string; intro: ReactNode }) {
  return (
    <header className="mb-10">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{intro}</p>
    </header>
  )
}

/** Un bloc titré, l'unité dont chaque page est faite. */
export function Section({
  title,
  intro,
  children,
}: {
  title: string
  intro?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {intro && <p className="mt-2 max-w-2xl text-muted-foreground">{intro}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 font-mono text-sm leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

/** Cadre un exemple vivant, pour qu'il se lise comme quelque chose qui tourne. */
export function Example({
  label,
  children,
  className = "",
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <p className="border-b border-border px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className={`p-6 ${className}`}>{children}</div>
    </div>
  )
}

/**
 * La valeur calculée d'une variable CSS. Les pages de tokens la relisent dans le
 * navigateur plutôt que de la recopier : la feuille de style reste la seule source.
 */
export function useCssVar(name: string): string {
  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])

  return value
}

export interface PageOptions {
  id: string
  name: string
  icon: IconType
  title?: string
  intro: ReactNode
  view: () => ReactNode
}

/**
 * Une page du site : une ressource Resource View dont `components.view` dessine
 * le contenu. Le menu et le routage viennent de la ressource, pas d'un routeur.
 */
export function definePage({ id, name, icon, title, intro, view }: PageOptions) {
  const View = view

  return createViewResource(id, {
    name,
    icon,
    components: {
      view: () => (
        <>
          <PageHeader title={title ?? name} intro={intro} />
          <View />
        </>
      ),
    },
  })
}
