import { QuartzComponentProps } from "../types"
import { getGardenMeta, parseGardenLinks } from "./util"

/** Custom footer — line, links, and copyright from the garden meta note. */
export function GardenFooter(props: QuartzComponentProps) {
  const meta = getGardenMeta(props.allFiles)
  const year = new Date().getFullYear()
  const line =
    (meta?.footerLine as string | undefined) ??
    `${props.cfg.pageTitle ?? "~/garden"} · built with obsidian + quartz`
  const links = parseGardenLinks(meta?.footerLinks)
  const copyright = (meta?.footerCopyright as string | undefined) ?? "bilal"

  return (
    <footer class="garden-footer">
      <span>{line}</span>
      <span class="footer-links">
        {links.map((link, i) => (
          <span key={link.url + link.label} class="footer-link-item">
            {i > 0 && <span class="footer-sep">·</span>}
            <a href={link.url}>{link.label}</a>
          </span>
        ))}
        {links.length > 0 && <span class="footer-sep">·</span>}
        <span class="footer-copy">
          © {copyright} {year}
        </span>
      </span>
    </footer>
  )
}
