# SPECIFICATIONS & EXTENSIONS

### Simplifying Extensions

I'm simplifying extensions by making them have runnable logic.
This should make it easier to create a flexible API.
Also it allows extensions to make decisions at runtime about the final look of something.

- Specification

  - Static parts

    - The type(s) of plugin (it restricts what APIs the plugin can use)

    - Theming, Templating and Extension UI _can_ be specified statically

  - Dynamic parts (Permission-based)

    - Extension logic

      An extension is basically a deck with frontend logic and an optional backend logic.

      The logic can be visual workflows or custom code.

      All executions are permission-based.

    - Embedded logic

      Embedded logic are run along with the app. They are essentially an extension to an app and can be considered part of the app's logic.

      An extension can add to a frontend ui and  logic as well as backend logic.

      The logic can be visual workflows or custom code.

      All executions are permission-based.

- Extension UI

  - Modal
  - Full Sidebar
  - Sidebar Section
  - Sidebar Widget
  - Canvas Widget (Shown in the canvas, like element selection widget for example)

- Permission-based Runtime

  - Scope (Workspace, Project, etc.)
  - Granular (Tables, etc.)

- API

  - User's Projects (CRUD)
  - Theming
  - Templating
  - Integrating
    - Credential access
    - Authentication
    - Metadata (action, trigger, etc.)
  - Hooks
    - Request middleware
    - Start hook
    - etc.
  - Extension UI
  - Extension Wiki (Deck)
  - Extension Pricing (pricing matrix, sliders, subscription types, etc.)
  - Extension Uninstallation (Required)


- Systems, Templates, Integrations are just a type of extension.

- Specifications

  - Gigamono Config
  - Projects (Decks, Frontends, Backends, Bases)
    - Tabs (Deck Pages, Frontend Pages, Workflows, Tables)
  - Credentials
  - Themes

- Dataflow shouldn't be a specification. It could be a log stored in the db or file.

- Folder structure

  - extension.yaml
  - theme.yaml
  - frontend/
  - backend/

- Extensions to build
  - Theming (for creating themes) - Free
  - Workspace Auth (Special Extension, gets updated by the system) - Free
  - Security Audit (checks for XSS, Data leak, etc.) - Free
  - SEO (like Yoast or RankMath) - Freemium
  - Analytics (mix of Google Analytics and HotJar) - Freemium
  - Copilot (with OpenAI Codex) - Freemium
  - Testing (on save, on commit, on preview, etc.) - Free
    - Unit Tests (for logic)
    - Integration Tests (for backend logic)
    - End to End Tests (for interactions)
