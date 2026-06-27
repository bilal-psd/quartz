import { QuartzComponentProps } from "../types"
import { FullSlug, resolveRelative } from "../../util/path"
import { pinnedNotes, noteDate, formatShortDate, tagToClass } from "./util"

/** Homepage "pinned" notes grid — driven by `pinned: true` in frontmatter. */
export function PinnedNotes(props: QuartzComponentProps) {
  const slug = (props.fileData.slug as FullSlug | undefined) ?? ("index" as FullSlug)
  const pinned = pinnedNotes(props.allFiles)

  if (pinned.length === 0) return null

  return (
    <section class="garden-section">
      <div class="section-header">
        <span class="section-title">pinned</span>
        <span class="section-line" />
        <span class="section-count">
          {pinned.length} {pinned.length === 1 ? "note" : "notes"}
        </span>
      </div>
      <div class="notes-grid">
        {pinned.map((note) => {
          const fm = (note.frontmatter ?? {}) as Record<string, unknown>
          const tags = (fm.tags ?? []) as string[]
          const tag = tags[0] ?? "note"
          const title = (fm.title as string | undefined) ?? "Untitled"
          const preview = (note.description as string | undefined) ?? ""
          const date = formatShortDate(noteDate(note))
          const linkCount = (note.links as unknown[] | undefined)?.length ?? 0

          return (
            <a class="note-card" href={resolveRelative(slug, note.slug as FullSlug)}>
              <div class={`note-tag ${tagToClass(tag)}`}>{tag.toLowerCase()}</div>
              <div class="note-title">{title}</div>
              {preview && <div class="note-preview">{preview}</div>}
              <div class="note-footer">
                <span>{date}</span>
                <div class="note-links">
                  {Array.from({ length: Math.min(linkCount, 4) }).map(() => (
                    <div class="link-dot" />
                  ))}
                  <span class="note-links-count">
                    {linkCount} {linkCount === 1 ? "link" : "links"}
                  </span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
