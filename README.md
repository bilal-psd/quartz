# Bilal's Quartz Garden

This is a personal fork of Quartz v5 for publishing a terminal-inspired digital garden at `garden.bilaldoesstuff.in`.

## What changed

- Custom `garden` page frame in `quartz/components/frames/GardenFrame.tsx`.
- Garden-specific UI components in `quartz/components/garden/` for the topbar, sidebar nav, hero, pinned notes, all-notes archive, recently tended list, and footer.
- Dark terminal visual theme in `quartz/styles/custom.scss`, based on `requirements/digital-garden.html`.
- `/` is a home page; `/all-notes` is the archive; tag pages also use the garden frame.
- Topbar/footer chrome is driven by hidden content metadata in `content/meta/site.md`.

## Content conventions

Notes use frontmatter fields:

- `draft`: unpublished when `true`
- `tags`: used for sidebar/tag pages
- `stage`: shown in archive/recent badges (`planted`, `tended`, `evergreen`, etc.)
- `pinned`: include in the homepage pinned grid when `true`
- `pinnedOrder`: optional ordering for pinned notes
- `moc`: marks map-of-content notes

Homepage hero copy lives in `content/index.md`:

- `heroEyebrow`, `heroTitle`, `heroAccent` in frontmatter
- body text is rendered as the hero description

## Commands

```bash
npm run quartz -- build
npm run quartz -- build --serve
npm run check
```

## TODO

- Reading tracker / review
- Movie and shows tracker / review

Upstream Quartz documentation: https://quartz.jzhao.xyz/
