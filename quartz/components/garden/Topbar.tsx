import { QuartzComponentProps } from "../types"
import { FullSlug } from "../../util/path"
import { contentNotes, getGardenMeta, parseGardenLinks } from "./util"

/**
 * Full-width terminal-style topbar: garden path on the left, note count and
 * external links (from the garden meta note) on the right.
 */
export function Topbar(props: QuartzComponentProps) {
  const slug = (props.fileData.slug as FullSlug | undefined) ?? ("index" as FullSlug)
  const segments = slug.split("/")
  const last = segments[segments.length - 1] || "index"
  const pageLabel = last === "index" && segments.length === 1 ? "index" : last

  const meta = getGardenMeta(props.allFiles)
  const pathLabel = (meta?.topbarPath as string | undefined) ?? props.cfg.pageTitle ?? "~/garden"
  const links = parseGardenLinks(meta?.topbarLinks)
  const count = contentNotes(props.allFiles).length

  return (
    <header class="garden-topbar">
      <div class="topbar-left">
        <a class="topbar-path" href="/">
          {pathLabel}
        </a>
        <span class="topbar-sep">/</span>
        <span class="topbar-page">{pageLabel}</span>
      </div>
      <div class="topbar-right">
        <span class="topbar-count">
          <span class="status-dot" /> {count} {count === 1 ? "note" : "notes"}
        </span>
        {links.map((link) => (
          <a href={link.url}>{link.label}</a>
        ))}
      </div>
    </header>
  )
}
