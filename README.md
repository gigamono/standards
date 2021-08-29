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

      An extension can add frontend logic as well as backend logic to an app.

      The logic can be visual workflows or custom code.

      All executions are permission-based.

- Permission-based Runtime

  - Scope (Workspace, Project, etc.)
  - Granular (Tables, etc.)

- API Access

  - User's Projects
  - Theming
  - Templating

- Systems and Templates are just a type of extension.

- Specifications that remain

  - Sageflow
  - Projects
  - Tabs
  - Credentials

- Dataflow shouldn't be a specification. It could be a log stored in the db or file.

- Folder structure

  - extension.yaml
  - theme.yaml
  - frontend/
  - backend/

- Examples
  - SEO Extension (like Yoast or RankMath)
  - Analytics Extension (like Google Analytics)
  - Copilot Extension (with OpenAI Codex)
