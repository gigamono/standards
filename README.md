# SPECIFICATIONS & EXTENSIONS

### Simplifying Plugins

I'm simplifying plugins by making them have runnable logic.
This should make it easier to create a flexible API.
Also it allows plugins to make decisions at runtime about the final look of something.

- Specification

  - Static parts

    - The type(s) of plugin (it restricts what APIs the plugin can use)

  - Dynamic parts (Permission-based)

    - Plugin logic

      A plugin is basically a deck with frontend logic and an optional backend logic.

      The logic can be visual workflows or custom code.

      All executions are permission-based.

    - Embedded logic

      Embedded logic are run along with the app. They are essentially an plugin to an app and can be considered part of the app's logic.

      An plugin can add to a frontend ui and logic as well as backend logic.

      The logic can be visual workflows or custom code.

      All executions are permission-based.

- Plugin Types

  - Extensions
  - Subapps

- Subapp UI

  Gets a dedicated section.
  There are two types of view. The Main view and the Previews.
  The Deck Subapp for example has multiple Previews (Slide Preview and Site Preview)
  All Previews have HMR.

  - Main, Preview
    - Canvas
    - Modal
    - Context Menu
    - Sidebar
    - Sidebar Section
    - Sidebar Widget
    - Bottom Bar
    - Canvas Control

- Extension UI

  Runs within a subapp.

  - Goes through Subapp Extension API to create UI

- Permission-based Runtime

  - Scope (Workspace, Project, etc.)
  - Granular (Tables, Directories, etc.)

- Core Subapps Extension APIs

  - UI
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

- Extension APIs

  - Keyboard Shortcuts
  - UI
  - Wiki (Deck)
  - Pricing (pricing matrix, sliders, subscription types, etc.)
  - Installation & Uninstallation (Required)
  - Theming

- Subapp APIs

  - UI
  - Extension Interface
  - Settings Interface
  - Keyboard Shortcuts
  - Subapp Bridge (an interface for subapps to access shared data)
  - Wiki (Deck)
  - Pricing (pricing matrix, sliders, subscription types, etc.)
  - Installation & Uninstallation (Required)

- Core Backend APIs

  - Frontend management and publishing
  - Serveless management and execution
  - Database management and querying
  - Files management
  - Subapps and Extensions Marketplace (???)

- Systems, Templates, Integrations are just a type of extension.

- Dataflow shouldn't be a specification. It could be a log stored in the db or file.

- Folder structure

  - extension.yaml
  - theme.yaml
  - frontend/
  - backend/

- Plugins I expect to see or create.

  - High Difficulty

    - *E-Commerce (for creating stores)
    - CMS [Multilingual] (for managing content)
    - Email Marketing (for managing email accounts)
    - Analytics (mix of Google Analytics and HotJar)
    - Copilot (with OpenAI Codex)
      - Copy writing
    - Testing (on save, on commit, on preview, etc.)
      - Unit Tests (for logic)
      - Integration Tests (for backend logic)
      - End to End Tests (for interactions)
    - *Debugger
    - Social Media
    - Forum
    - *Animation
    - Project Management
    - Ticket Management
    - Cloud Monitoring

  - Mid Difficulty

    - *Security Audit (checks for XSS, Data leak, etc.) https://nocodenohack.com/
    - *SEO (like Yoast or RankMath)
    - Profiler
    - Search
    - Code Editor
    - *File Manager

  - Low Difficulty

    - *Theming (for creating themes)
    - *Workspace Auth (Special Extension, gets updated by the system)

- Subapps to build

  - Frontend
  - Deck
  - Backend
  - Base
  - API (like Postman)

- Security
  - Permissions are static snippets. They are removed when a user accepts them before runtime.
  - Installed extensions page has permission setting (like in Android)
