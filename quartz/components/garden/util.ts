import { QuartzPluginData } from "../../plugins/vfile"
import { FullSlug, isFolderPath } from "../../util/path"

/** Growth stages we know how to render, mapped to the mockup's action badges. */
export const STAGE_ORDER = ["planted", "growing", "evergreen"] as const
export type GrowthStage = (typeof STAGE_ORDER)[number]

/** Map a frontmatter `stage` to the badge label shown in recently tended. */
export function stageToAction(stage: string | undefined): string {
  return stage ?? "planted"
}

/** A "real" content note: excludes navigation/system pages and folder/tag index pages. */
export function isContentNote(data: QuartzPluginData): boolean {
  const slug = data.slug as string | undefined
  if (!slug) return false
  if (slug === "404" || slug === "index" || slug === "all-notes") return false
  if (slug === "meta" || slug.startsWith("meta/")) return false
  if (slug === "tags" || slug.startsWith("tags/")) return false
  if (isFolderPath(slug as FullSlug)) return false
  return true
}

/** All content notes from the file set. */
export function contentNotes(allFiles: QuartzPluginData[]): QuartzPluginData[] {
  return allFiles.filter(isContentNote)
}

/** Best-effort date for a note without throwing when defaultDateType is unset. */
export function noteDate(data: QuartzPluginData): Date | undefined {
  const dates = data.dates as Record<string, Date> | undefined
  if (!dates) return undefined
  const key = (data.defaultDateType as string | undefined) ?? "modified"
  return dates[key] ?? dates.modified ?? dates.created ?? dates.published
}

/** Notes sorted most-recently-tended first. */
export function notesByRecency(allFiles: QuartzPluginData[]): QuartzPluginData[] {
  return contentNotes(allFiles)
    .map((d) => ({ d, t: noteDate(d)?.getTime() ?? 0 }))
    .sort((a, b) => b.t - a.t)
    .map((x) => x.d)
}

/** Earliest note date across all content notes. */
export function oldestSeedDate(allFiles: QuartzPluginData[]): Date | undefined {
  const times = contentNotes(allFiles)
    .map(noteDate)
    .filter((d): d is Date => d !== undefined)
    .map((d) => d.getTime())
  if (times.length === 0) return undefined
  return new Date(Math.min(...times))
}

/** Total outgoing links across all content notes. */
export function totalConnections(allFiles: QuartzPluginData[]): number {
  return contentNotes(allFiles).reduce((sum, note) => {
    const links = note.links as unknown[] | undefined
    return sum + (links?.length ?? 0)
  }, 0)
}

/** Pinned notes, sorted by pinnedOrder then date descending. */
export function pinnedNotes(allFiles: QuartzPluginData[]): QuartzPluginData[] {
  return contentNotes(allFiles)
    .filter((note) => note.frontmatter?.pinned === true)
    .map((note) => ({
      note,
      order: (note.frontmatter?.pinnedOrder as number | undefined) ?? Infinity,
      date: noteDate(note)?.getTime() ?? 0,
    }))
    .sort((a, b) => a.order - b.order || b.date - a.date)
    .map((x) => x.note)
}

/** Map a tag name to a CSS class for card category colour (single accent for all tags). */
export function tagToClass(_tag: string): string {
  return "tag-llm"
}

export type GardenLink = { label: string; url: string }

/** Site chrome note (`gardenMeta: true` in frontmatter, typically under `meta/`). */
export function getGardenMeta(allFiles: QuartzPluginData[]): Record<string, unknown> | undefined {
  const note = allFiles.find((f) => f.frontmatter?.gardenMeta === true)
  return note?.frontmatter as Record<string, unknown> | undefined
}

export function parseGardenLinks(raw: unknown): GardenLink[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((item): item is { label: string; url: string } => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as GardenLink).label === "string" &&
        typeof (item as GardenLink).url === "string"
      )
    })
    .map((item) => ({ label: item.label, url: item.url }))
}

/** Dot colour for growth-stage sidebar entries. */
export const STAGE_COLORS: Record<string, string> = {
  planted: "var(--green-bright)",
  growing: "var(--amber)",
  tended: "var(--amber)",
  evergreen: "#7a8fc0",
}

/** Count of notes per tag, sorted by frequency then name. */
export function tagCounts(allFiles: QuartzPluginData[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const note of contentNotes(allFiles)) {
    const tags = (note.frontmatter?.tags ?? []) as string[]
    for (const tag of tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

/** Count of notes per growth stage. */
export function stageCounts(allFiles: QuartzPluginData[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const note of contentNotes(allFiles)) {
    const stage = (note.frontmatter?.stage as string | undefined) ?? "planted"
    counts.set(stage, (counts.get(stage) ?? 0) + 1)
  }
  return counts
}

export function formatShortDate(d: Date | undefined): string {
  if (!d) return ""
  return d.toISOString().slice(0, 10)
}
