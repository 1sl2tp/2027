# UI 2027 V46 — master library independent, new implementation 100%

Date: 2026-11-23. Scope: 1sl2tp/2027 only.

## Decision

**2027 is the only parent UI library.** CHAT and TAPHOA code/UI/layout are expressly NOT reused, copied, used as selectors or considered design constraints. They may be read only to understand the historical workflow (what an action should achieve). The new UI is original, with current 2027 token/primitive contracts and open GitHub design references.

- Canonical: UI-LIBRARY → UI-SHELL → UI-SCREEN-SLOT → CHAT-SCREEN / SALES-SCREEN / WORK-SCREEN / REPORT-SCREEN.
- Primitives: UI-LIBRARY → UI-PRIMITIVES → UI-BUTTON, UI-ICON, UI-TEXT, SEARCH-FIELD, QUANTITY-STEPPER, DATA-TABLE.
- Table: ONE DATA-TABLE, ONE COLUMN_SCHEMA (20 columns). Sales and Reports mount the same primitive at explicit slots, not duplicate tables.
- Chat Composer belongs to the newly authored 2027 Chat template; uses 2027's own ds-composer, ui-button and svg sprite.
- The V44 chat-live-map module and code crosswalk remain historical evidence in the repository, but are no longer mounted, imported or shown as the parent design in the main library.

## Demo & boundaries
Four interactive tabs with original sample data: Chat, Sales, Work, Reports. All DOM authored with createElement/textContent. No network, Supabase, customer data, auth, production messages or transactions. This is a DESIGN system specimen, not a deployment to real apps.

## Evidence
- E0-2: canonical contracts, source audit, tests.
- E3: GitHub Actions + Pages completion.
- E4-5: real Safari/Chrome/PWA keyboard, scroll, accessibility, responsive checks remain separately required.

## Public design research (reference only)
[assistant-ui](https://github.com/assistant-ui/assistant-ui), [React Aria](https://github.com/adobe/react-spectrum), [Radix](https://github.com/radix-ui/primitives), [shadcn/ui](https://github.com/shadcn-ui/ui), [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui), [Lucide](https://github.com/lucide-icons/lucide).
