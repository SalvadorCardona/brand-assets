import type { ReactNode } from "react"
import {
  ArrowRight,
  AudioLines,
  Check,
  FileText,
  Keyboard,
  LayoutTemplate,
  Lock,
  Mic,
  Plus,
  Sparkles,
  Timer,
} from "lucide-react"
import { definePage } from "@/lib/doc"
import { HermezMark } from "@/identity/hermez-mark"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Separator } from "@/ui/separator"

/*
 * Une landing page de démonstration, pour un produit fictif. Tout y vient du
 * système : tokens, composants, icônes de ligne. Elle se dessine dans un cadre
 * de navigateur et s'adapte à sa largeur (container queries), pas à l'écran.
 */

const features = [
  { icon: Mic, title: "Dictée continue", text: "Parlez, le texte suit. Pas de bouton à maintenir, pas de limite de durée." },
  { icon: Keyboard, title: "Partout où on tape", text: "Un raccourci global écrit dans n'importe quel champ, de n'importe quelle application." },
  { icon: FileText, title: "Ponctuation propre", text: "Les virgules, les majuscules et les paragraphes arrivent d'eux-mêmes." },
  { icon: Lock, title: "Local d'abord", text: "La transcription tourne sur la machine. Rien ne part sans votre accord." },
  { icon: Timer, title: "Temps réel", text: "Moins de 300 ms entre la voix et l'écran, même sur un portable." },
  { icon: AudioLines, title: "Vocabulaire à vous", text: "Noms propres, sigles, jargon : ajoutez-les une fois, ils sont retenus." },
]

const steps = [
  { title: "Installez", text: "Une application de bureau, un raccourci à choisir." },
  { title: "Parlez", text: "Dans un mail, un ticket, un document : là où est le curseur." },
  { title: "Relisez", text: "Le texte est déjà ponctué. Il ne reste qu'à envoyer." },
]

const plans = [
  {
    name: "Solo",
    price: "0 €",
    period: "pour toujours",
    text: "Pour essayer au quotidien.",
    features: ["30 minutes par jour", "Transcription locale", "Raccourci global"],
    cta: "Commencer",
    featured: false,
  },
  {
    name: "Pro",
    price: "9 €",
    period: "par mois",
    text: "Pour celles et ceux qui écrivent toute la journée.",
    features: ["Dictée illimitée", "Vocabulaire personnalisé", "Ponctuation avancée", "Support prioritaire"],
    cta: "Passer à Pro",
    featured: true,
  },
  {
    name: "Équipe",
    price: "7 €",
    period: "par personne et par mois",
    text: "Pour un service entier.",
    features: ["Tout Pro", "Vocabulaire partagé", "Facturation centralisée"],
    cta: "Nous contacter",
    featured: false,
  },
]

const faq = [
  {
    q: "Mes enregistrements quittent-ils mon ordinateur ?",
    a: "Non. La transcription se fait en local ; seuls les réglages se synchronisent, si vous le voulez.",
  },
  {
    q: "Quelles langues sont prises en charge ?",
    a: "Le français et l'anglais aujourd'hui, l'espagnol et l'allemand dans les prochains mois.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, depuis les réglages. L'abonnement court jusqu'à la fin de la période payée.",
  },
]

/** Une section de la landing : un sur-titre, un titre, un chapeau, puis le contenu. */
function Block({
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`px-6 py-16 @3xl:px-12 @3xl:py-20 ${className}`}>
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-balance">{title}</h2>
      {intro && <p className="mt-3 max-w-xl text-muted-foreground text-pretty">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  )
}

/** La capture du produit, dessinée avec les surfaces du thème plutôt qu'une image. */
function ProductShot() {
  const lines = [
    "Bonjour à toutes et à tous,",
    "Le point de la semaine : la version 2.4 part mardi, après la relecture des traductions.",
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-3 text-xs text-muted-foreground">Nouveau message</span>
      </div>
      <div className="grid @3xl:grid-cols-[1fr_15rem]">
        <div className="space-y-3 p-5 text-sm">
          <p className="text-muted-foreground">
            À : <span className="text-foreground">equipe@exemple.fr</span>
          </p>
          <Separator />
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            Côté support, trois tickets restent ouverts
            <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-primary" />
          </p>
        </div>
        <div className="border-t border-border bg-muted/50 p-5 @3xl:border-t-0 @3xl:border-l">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive/60" />
              <span className="relative inline-flex size-2 rounded-full bg-destructive" />
            </span>
            Écoute en cours
          </div>
          <div className="mt-4 flex h-10 items-center gap-0.5" aria-hidden>
            {[3, 6, 9, 5, 8, 12, 7, 4, 10, 6, 3, 8, 11, 5, 7, 4, 9, 6, 3, 5].map((h, i) => (
              <span key={i} className="w-1 rounded-full bg-primary/70" style={{ height: `${h * 3}px` }} />
            ))}
          </div>
          <dl className="mt-4 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Langue</dt>
              <dd>Français</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Latence</dt>
              <dd className="font-mono">212 ms</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Mode</dt>
              <dd>Local</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

function Landing() {
  return (
    <div className="@container overflow-hidden rounded-xl border border-border bg-background shadow-md">
      {/* La barre du navigateur, pour lire la page comme un site à part entière */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        </div>
        <span className="mx-auto w-full max-w-xs truncate rounded-md bg-background px-3 py-1 text-center font-mono text-xs text-muted-foreground">
          produit.exemple.fr
        </span>
      </div>

      {/* Navigation */}
      <header className="flex items-center gap-6 border-b border-border px-6 py-4 @3xl:px-12">
        <span className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Mic className="size-4" />
          </span>
          Dictaphone
        </span>
        <nav className="hidden gap-5 text-sm text-muted-foreground @2xl:flex">
          <span>Fonctionnalités</span>
          <span>Tarifs</span>
          <span>FAQ</span>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden @md:inline-flex">
            Se connecter
          </Button>
          <Button size="sm">Essayer</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 @3xl:px-12 @3xl:pt-24">
        <Badge variant="outline" className="gap-1.5">
          <Sparkles className="size-3" />
          Nouveau : vocabulaire partagé en équipe
        </Badge>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-balance @3xl:text-5xl">
          Écrivez à la vitesse où vous parlez.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
          Une dictée qui marche partout où vous tapez, ponctue toute seule et ne quitte jamais votre
          machine.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">
            Essayer gratuitement
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            Voir la démo
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Sans carte bancaire. macOS, Windows et Linux.</p>

        <div className="mt-14">
          <ProductShot />
        </div>
      </section>

      <Separator />

      {/* Fonctionnalités */}
      <Block
        eyebrow="Fonctionnalités"
        title="Tout ce qu'il faut pour ne plus taper"
        intro="Six choses qu'on attend d'une dictée, faites sérieusement."
      >
        <ul className="grid gap-x-8 gap-y-10 @xl:grid-cols-2 @4xl:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-card">
                <Icon className="size-4 text-primary" />
              </span>
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Étapes */}
      <Block eyebrow="Comment ça marche" title="Trois étapes, aucune configuration" className="bg-muted/40">
        <ol className="grid gap-6 @2xl:grid-cols-3">
          {steps.map(({ title, text }, index) => (
            <li key={title} className="border-t border-border pt-4">
              <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
              <h3 className="mt-2 font-medium">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Block>

      {/* Tarifs */}
      <Block eyebrow="Tarifs" title="Un prix simple" intro="Changez de formule quand vous voulez, sans engagement.">
        <div className="grid gap-4 @3xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border bg-card p-6 ${
                plan.featured ? "border-primary shadow-md" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{plan.name}</h3>
                {plan.featured && <Badge>Le plus choisi</Badge>}
              </div>
              <p className="mt-4">
                <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
                <span className="ml-1.5 text-sm text-muted-foreground">{plan.period}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.text}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6" variant={plan.featured ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </Block>

      {/* FAQ */}
      <Block eyebrow="FAQ" title="Les questions qu'on nous pose" className="bg-muted/40">
        <div className="max-w-2xl divide-y divide-border border-y border-border">
          {faq.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <Plus className="size-4 shrink-0 text-muted-foreground transition-transform duration-(--duration-base) ease-(--ease-standard) group-open:rotate-45" />
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </Block>

      {/* Appel final */}
      <section className="px-6 py-16 @3xl:px-12 @3xl:py-20">
        <div className="rounded-xl border border-border bg-card p-8 @3xl:flex @3xl:items-center @3xl:justify-between @3xl:gap-10 @3xl:p-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Prêt à poser le clavier ?</h2>
            <p className="mt-2 text-muted-foreground">Recevez le lien de téléchargement par e-mail.</p>
          </div>
          <form className="mt-6 flex w-full max-w-sm gap-2 @3xl:mt-0" onSubmit={(event) => event.preventDefault()}>
            <Input type="email" placeholder="vous@exemple.fr" aria-label="Adresse e-mail" />
            <Button type="submit">Envoyer</Button>
          </form>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="flex flex-col gap-4 border-t border-border px-6 py-8 text-sm text-muted-foreground @2xl:flex-row @2xl:items-center @2xl:justify-between @3xl:px-12">
        <span className="flex items-center gap-2">
          <HermezMark className="size-5" />A Hermez product
        </span>
        <span className="flex gap-5">
          <span>Mentions légales</span>
          <span>Confidentialité</span>
          <span>Contact</span>
        </span>
      </footer>
    </div>
  )
}

export default definePage({
  id: "example-landing",
  name: "Landing page",
  icon: LayoutTemplate,
  intro:
    "Une landing page de produit fictive, faite uniquement des tokens et des composants du système.",
  view: () => <Landing />,
})
