# Antonio Obradović — Architect

A cinematic black hero, metallic spider lily, warm paper surfaces, oversized Instrument Serif typography, fine rules and indexed editorial layouts. The journal and projects use typography rather than thumbnails. A darker contact section closes the homepage.

## Content

The homepage and dedicated archive pages share `ProjectIndex` and `JournalIndex`. Both existing projects and all seven articles are retained. Journal entries are grouped by year in descending order, with sticky year labels on desktop. Projects show a short description, year, tags, and separate Website/GitHub links when supplied. Existing `url` fields remain supported; no destinations are invented. Article cover images are removed from the reading header; screenshots inside Markdown articles remain part of the writing.

## Flower lifecycle

`MetalFlower.vue` renders a stable server-side host. It is no longer a client-only component mounted over an animated placeholder. WebGL initializes after hydration and the first layout frame. The homepage entrance timeline does not animate the flower wrapper's opacity; the flower reveals itself after rendering. ResizeObserver, font readiness and pageshow refresh the canvas dimensions. Context restoration redraws the surface. A visible partial bloom is drawn initially, then GSAP opens it further.

The lily is adapted from the petal and filament construction at https://github.com/cupidbity/spiderlily (`spiderlily-web/index.html`), credited in `app/utils/spiderLily.ts`. Silver PBR petals, long hooked filaments, and warm metallic anthers rotate and sway automatically. There is no remote embed or viewer UI. The pause control, reduced-motion support, offscreen/hidden suspension and GPU resource cleanup remain.

## Motion

The initial visit has a short, skippable GSAP monogram entrance with split panels. The fixed cover is rendered in the initial server HTML on every document load, and its scoped GSAP timeline starts after hydration and two paint frames. It plays for about 2.7 seconds, with an Enter now button and Escape shortcut. Reduced motion gets a brief fade. A five-second JavaScript timeout, six-second CSS safety exit, and no-JavaScript fallback prevent the cover from trapping the page. It is separate from content fetching and persists across internal navigation without replaying. NuxtLoadingIndicator reflects route loading. Route transitions use a short fade and vertical offset.

The enlarged cursor has a 50px following ring, a precise 7px dot, and 94px contextual hover states. It is teleported to the body and disabled for coarse pointers, reduced motion, editable fields and keyboard navigation. Editorial rows use transform-only reveals so content does not stay hidden if animation is interrupted.

## Verification

The production build and full type check validate the Nuxt application. Static output checks verify the real flower host, two projects, seven article links, year grouping, available project destinations, and image-free index pages. Browser access is blocked by a saved permission setting; runtime hard-refresh and visual behavior need confirmation in the user's browser.

`pnpm typecheck` and `pnpm build` use `.nuxt-verify` instead of the live development `.nuxt` directory. This prevents their Nuxt Content preparation from replacing the running preview's generated SQL dump.
