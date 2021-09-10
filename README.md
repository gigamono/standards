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

      An extension can add to a frontend ui and logic as well as backend logic.

      The logic can be visual workflows or custom code.

      All executions are permission-based.

- Plugin Types

  - Extensions (runs in a specific arena)
  - Apps

- App UI

  Gets a dedicated section.

  - Canvas
  - Modal
  - Context Menu
  - Sidebar
  - Sidebar Section
  - Sidebar Widget
  - Bottom Bar

- Extension UI

  Runs within an app.

  - Modal
  - Context Menu
  - Sidebar
  - Sidebar Section
  - Sidebar Widget
  - Bottom Bar
  - In-Canvas Widget
  - Stock Apps
    - Editor Block

- Permission-based Runtime

  - Scope (Workspace, Project, etc.)
  - Granular (Tables, etc.)

- Stock Apps Extension APIs

  - User's Projects (CRUD)
  - Templating
  - Integrating
    - Credential access
    - Authentication
    - Metadata (action, trigger, etc.)
  - Hooks
    - Request middleware
    - Start hook
    - etc.
  - Editor Experience (like in VSCode)
    - Typing (Auto-complete, etc.)
    - Selection Widget

- Core Extension APIs

  - Keyboard Shortcuts
  - UI
  - Wiki (Deck)
  - Pricing (pricing matrix, sliders, subscription types, etc.)
  - Installation & Uninstallation (Required)
  - Theming

- Core App APIs

  - UI
  - Extension Interface
  - Settings Interface
  - Keyboard Shortcuts
  - UI
  - Wiki (Deck)
  - Pricing (pricing matrix, sliders, subscription types, etc.)
  - Installation & Uninstallation (Required)

- Core Backend APIs

  - Frontend management and publishing
  - Serveless management and execution
  - Database management and querying
  - Files management
  - Apps and Extensions Marketplace (???)

- Systems, Templates, Integrations are just a type of extension.




- Dataflow shouldn't be a specification. It could be a log stored in the db or file.

- Folder structure

  - extension.yaml
  - theme.yaml
  - frontend/
  - backend/

- Extensions to build

  - High Difficulty

    - E-Commerce (for creating stores) - Freemium
    - CMS [Multilingual] (for managing content) - Free
    - Email Marketing (for managing email accounts) - Freemium
    - Analytics (mix of Google Analytics and HotJar) - Freemium
    - Copilot (with OpenAI Codex) - Freemium
      - Copy writing
    - Testing (on save, on commit, on preview, etc.) - Free
      - Unit Tests (for logic)
      - Integration Tests (for backend logic)
      - End to End Tests (for interactions)
    - Debugger - Free
    - Social Media - Freemium
    - Forum - Freemium
    - Animation - Free

  - Mid Difficulty

    - Security Audit (checks for XSS, Data leak, etc.) - Free
    - SEO (like Yoast or RankMath) - Freemium

  - Low Difficulty

    - Theming (for creating themes) - Free
    - Workspace Auth (Special Extension, gets updated by the system) - Free

- Security
  - Permissions are static snippets. They are removed when a user accepts them before runtime.
  - Installed extensions page has permission setting (like in Android)
