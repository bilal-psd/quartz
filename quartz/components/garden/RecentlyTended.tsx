import { QuartzComponentProps } from "../types"
import { FullSlug, resolveRelative } from "../../util/path"
import { notesByRecency, noteDate, stageToAction, formatShortDate } from "./util"

const LIMIT = 7

/**
 * Dynamic "recently tended" table driven by real notes, sorted by date. The
 * action badge (planted / tended / evergreen) is derived from the `stage`
 * frontmatter.
 */
export function RecentlyTended(props: QuartzComponentProps) {
  const slug = (props.fileData.slug as FullSlug | undefined) ?? ("index" as FullSlug)
  const rows = notesByRecency(props.allFiles).slice(0, LIMIT)

  if (rows.length === 0) return null

  return (
    <section class="garden-section">
      <div class="section-header">
        <span class="section-title">recently tended</span>
        <span class="section-line" />
        <span class="section-count">
          {rows.length} {rows.length === 1 ? "note" : "notes"}
        </span>
      </div>
      <div class="tended-list">
        {rows.map((note) => {
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
