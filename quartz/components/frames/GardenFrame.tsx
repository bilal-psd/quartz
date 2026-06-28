import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import { Topbar } from "../garden/Topbar"
import { GardenNav } from "../garden/GardenNav"
import { Hero } from "../garden/Hero"
import { PinnedNotes } from "../garden/PinnedNotes"
import { RecentlyTended } from "../garden/RecentlyTended"
import { AllNotes } from "../garden/AllNotes"
import { GardenFooter } from "../garden/GardenFooter"

const Header = HeaderConstructor()

/**
 * Garden frame — replicates the digital-garden mockup.
 *
 * Shared chrome (topbar, custom left nav + kept search, custom footer) wraps
 * every page. The home page (`index`) renders the bespoke hero / pinned /
 * recently-tended layout; all other notes fall back to the standard
 * article layout (header + body + afterBody) with the right sidebar.
 */
export const GardenFrame: PageFrame = {
  name: "garden",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
  }: PageFrameProps) {
    const slug = componentData.fileData.slug as string | undefined
    const isHome = slug === "index"
    const isAllNotes = slug === "all-notes"
    const isTagPage = slug === "tags" || slug?.startsWith("tags/")
    const showBackLink = !isHome && !isAllNotes && !isTagPage
    const tags = (componentData.fileData.frontmatter?.tags ?? []) as string[]
    const backTarget = tags.length > 0 ? `/tags/${tags[0]}` : "/all-notes"
    const backLabel = tags.length > 0 ? tags[0] : "all notes"

    return (
      <>
        <Topbar {...componentData} />

        <nav class="garden-sidebar">
          <div class="garden-sidebar-tools">
            {left.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
          <GardenNav {...componentData} />
        </nav>

        <main class="garden-main">
          {isHome ? (
            <>
              <Hero {...componentData} Body={Content} />
              <PinnedNotes {...componentData} />
              <RecentlyTended {...componentData} />
            </>
          ) : isAllNotes ? (
            <AllNotes {...componentData} />
          ) : (
            <div class="center">
              <div class="page-header">
                {showBackLink && (
                  <a class="garden-back" href={backTarget}>
                    ← {backLabel}
                  </a>
                )}
                <Header {...componentData}>
                  {header.map((HeaderComponent) => (
                    <HeaderComponent {...componentData} />
                  ))}
                </Header>
                <div class="popover-hint">
                  {beforeBody.map((BodyComponent) => (
                    <BodyComponent {...componentData} />
                  ))}
                </div>
              </div>
              <Content {...componentData} />
              <hr />
              <div class="page-footer">
                {afterBody.map((BodyComponent) => (
                  <BodyComponent {...componentData} />
                ))}
              </div>
            </div>
          )}
        </main>

        {!isHome && !isAllNotes && right.length > 0 && (
          <aside class="garden-right">
            {right.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </aside>
        )}

        <GardenFooter {...componentData} />
      </>
    )
  },
}
