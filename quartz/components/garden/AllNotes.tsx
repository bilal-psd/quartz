import { QuartzComponentProps } from "../types"
import { FullSlug, resolveRelative } from "../../util/path"
import { notesByRecency, noteDate, stageToAction, formatShortDate } from "./util"

/** Full archive page rendered at /all-notes. */
export function AllNotes(props: QuartzComponentProps) {
  const slug = (props.fileData.slug as FullSlug | undefined) ?? ("all-notes" as FullSlug)
  const notes = notesByRecency(props.allFiles)

  return (
    <section class="garden-section all-notes-section">
      <div class="section-header">
        <span class="section-title">all notes</span>
        <span class="section-line" />
        <span class="section-count">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>
      <div class="tended-list">
        {notes.map((note) => {
          const title = (note.frontmatter?.title as string | undefined) ?? "Untitled"
          const action = stageToAction(note.frontmatter?.stage as string | undefined)
          const date = formatShortDate(noteDate(note))
          return (
            <a class="tended-row" href={resolveRelative(slug, note.slug as FullSlug)}>
              <span class="tended-date">{date}</span>
              <span class="tended-name">{title}</span>
              <span class={`tended-action action-${action}`}>{action}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
