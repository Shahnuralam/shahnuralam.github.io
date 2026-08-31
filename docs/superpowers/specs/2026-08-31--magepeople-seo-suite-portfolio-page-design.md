# MagePeople SEO Suite Portfolio Case Study

Date: 2026-08-31

## Objective

Add MagePeople SEO Suite to Shahnur Alam's existing GitHub Pages portfolio as a featured project and a complete standalone case study. The page must describe the product and engineering accurately without presenting `mpseo.ai` (or any other unowned hostname) as its domain.

## Existing context

The portfolio is a dependency-free static site with shared `assets/site.css` and `assets/site.js`, automatic light/dark themes, a canvas background, reveal animations, responsive project cards, and one established private-repository case study at `/wp-mcp-server/`.

## Approaches considered

1. Add only a homepage project card. Fast, but does not satisfy the request for one page containing the full details.
2. Add a generic copy of the MCP case study. Consistent, but too visually and narratively similar for a different product.
3. Add a homepage card plus a purpose-built `/magepeople-seo-suite/` case study using the shared portfolio shell and an SEO-specific signal-map visual language. Chosen because it preserves brand consistency while giving the project a memorable identity.

## Page structure

1. Breadcrumb, product category, title and real-data positioning.
2. Verified product-scale metrics.
3. The SEO tooling problem: fragmented settings, duplicate output and invented analytics.
4. Product principles: real sources, one output owner, safe assistant actions.
5. Major capability grid covering on-page SEO, schema, crawling, content health, analytics, AI workflows, integrations and WooCommerce.
6. Search-signal pipeline showing WordPress data flowing through resolvers into canonical frontend outputs and audits.
7. Content Health and canonical consistency details.
8. WooCommerce ProductGroup and merchant-policy implementation.
9. Assistant/Abilities architecture and security boundaries.
10. Engineering decisions, compatibility and verification evidence.
11. Technology/tool surface and a private-source walkthrough CTA.

## Visual direction

Keep the portfolio's typography, spacing, theme variables, navigation and canvas atmosphere. Add page-local teal/lime “search signal” accents, a CSS-only node map in the hero, compact metric ribbons, layered architecture cards, and a crawler-flow diagram. Motion is CSS/observer based and respects `prefers-reduced-motion`.

## Homepage integration

- Add `SEO Suite` to desktop/mobile navigation.
- Add MagePeople SEO Suite as a featured project near WordPress MCP Server.
- Link to `/magepeople-seo-suite/` as a case study.
- Do not link to the private repository or an unowned product domain.

## Accessibility and performance

- Semantic headings, lists, tables and link labels.
- Decorative signal map hidden from assistive technology.
- Visible keyboard focus inherited from the portfolio and added where needed.
- No external fonts, frameworks, images or runtime dependencies.
- Responsive at the existing 860px, 760px and 560px breakpoints.
- Reduced-motion users receive static, fully visible content.

## Verification

- Parse both HTML files and check required metadata and links.
- Confirm there are no references to `mpseo.ai`.
- Validate internal case-study URLs and relative assets.
- Run a local HTTP server and smoke-test desktop/mobile rendering.
- Check Git status, commit to `main`, push, and verify the deployed GitHub Pages URL.
