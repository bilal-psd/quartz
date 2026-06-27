import { QuartzComponent, QuartzComponentProps } from "../types"
import {
  contentNotes,
  notesByRecency,
  noteDate,
  formatShortDate,
  oldestSeedDate,
  totalConnections,
} from "./util"

const DEFAULT_EYEBROW = "ls -la ~/garden"
const DEFAULT_TITLE = "notes from the"
const DEFAULT_ACCENT = "terminal garden"
const DEFAULT_DESC =
  "A collection of half-formed ideas, distilled thinking, and things I keep returning to. Part notebook, part reference. Not a blog — things here get revised and linked and left unfinished on purpose."

type HeroProps = QuartzComponentProps & {
  Body?: QuartzComponent
}

/**
 * Homepage hero: terminal eyebrow, large display title with a blinking cursor,
 * description from index.md body (or frontmatter fallback), and meta stats.
 */
export function Hero(props: HeroProps) {
  const fm = (props.fileData.frontmatter ?? {}) as Record<string, unknown>
  const notes = contentNotes(props.allFiles)
  const count = notes.length
  const recent = notesByRecency(props.allFiles)
  const latest = recent.length > 0 ? noteDate(recent[0]) : undefined
  const oldest = oldestSeedDate(props.allFiles)
  const connections = totalConnections(props.allFiles)

  const eyebrow = (fm.heroEyebrow as string | undefined) ?? DEFAULT_EYEBROW
  const titleLine = (fm.heroTitle as string | undefined) ?? DEFAULT_TITLE
  const accentLine = (fm.heroAccent as string | undefined) ?? DEFAULT_ACCENT
  const heroDescription = fm.heroDescription as string | undefined

  const connectionsOverride = fm.connections as number | string | undefined
  const oldestSeedOverride = fm.oldestSeed as string | undefined

  const lastUpdated = latest
    ? latest.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Jun 2026"

  const Body = props.Body
  const hasBodyContent =
    Body &&
    props.tree &&
    "children" in props.tree &&
    Array.isArray(props.tree.children) &&
    props.tree.children.length > 0

  return (
    <section class="hero">
      <div class="hero-eyebrow">
        <span class="prompt">$</span> {eyebrow} &nbsp;|&nbsp; last updated {lastUpdated}
      </div>
      <h1 class="hero-title">
        {titleLine}
        <br />
        <span class="line2">
          {accentLine}
          <span class="cursor">_</span>
        </span>
      </h1>
      {hasBodyContent ? (
        <div class="hero-desc-wrap">
          <Body {...props} />
        </div>
      ) : heroDescription ? (
        <p class="hero-desc">{heroDescription}</p>
      ) : (
        <p class="hero-desc">{DEFAULT_DESC}</p>
      )}
      <div class="hero-meta">
        <div class="hero-meta-item">
          <span class="k">notes:</span>
          <span class="v">{count}</span>
        </div>
        <div class="hero-meta-item">
          <span class="k">connections:</span>
          <span class="v">{connectionsOverride ?? connections}</span>
        </div>
        <div class="hero-meta-item">
          <span class="k">oldest seed:</span>
          <span class="v">{oldestSeedOverride ?? formatShortDate(oldest) ?? "—"}</span>
        </div>
        <div class="hero-meta-item">
          <span class="k">last tended:</span>
          <span class="v">{latest ? formatShortDate(latest) : "today"}</span>
        </div>
      </div>
    </section>
  )
}
