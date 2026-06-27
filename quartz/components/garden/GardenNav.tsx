import { QuartzComponentProps } from "../types"
import { FullSlug, resolveRelative, SimpleSlug } from "../../util/path"
import { contentNotes, stageCounts, tagCounts, STAGE_COLORS } from "./util"

/**
 * Custom left-sidebar navigation: browse (tags) and growth stage counts.
 * The search box rendered by the frame sits above this.
 */
export function GardenNav(props: QuartzComponentProps) {
  const slug = (props.fileData.slug as FullSlug | undefined) ?? ("index" as FullSlug)
  const total = contentNotes(props.allFiles).length
  const tags = tagCounts(props.allFiles).slice(0, 6)
  const stages = stageCounts(props.allFiles)

  const rel = (target: string) => resolveRelative(slug, target as SimpleSlug)

  const stageEntries = [...stages.entries()]
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => a.localeCompare(b))

  return (
    <div class="garden-nav">
      <div class="nav-section">
        <div class="nav-label">browse</div>
        <a class={`tree-item ${slug === "index" ? "active" : ""}`} href={rel("index")}>
          <span class="tree-icon">◆</span>
          <span class="tree-text">home</span>
        </a>
        <a class={`tree-item ${slug === "all-notes" ? "active" : ""}`} href={rel("all-notes")}>
          <span class="tree-icon">◆</span>
          <span class="tree-text">all notes</span>
          <span class="tree-count">{total}</span>
        </a>
        {tags.map(({ tag, count }) => (
          <a class="tree-item" href={rel(`tags/${tag}`)}>
            <span class="tree-icon">▸</span>
            <span class="tree-text">{tag}</span>
            <span class="tree-count">{count}</span>
          </a>
        ))}
      </div>

      {stageEntries.length > 0 && (
        <>
          <div class="nav-divider" />
          <div class="nav-section">
            <div class="nav-label">growth stage</div>
            {stageEntries.map(([stage, count]) => (
              <a class="tree-item" href={rel("index")}>
                <span class="tree-icon" style={`color: ${STAGE_COLORS[stage] ?? "var(--muted)"}`}>
                  ●
                </span>
                <span class="tree-text">{stage}</span>
                <span class="tree-count">{count}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
