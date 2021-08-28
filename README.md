# SPECIFICATIONS & EXTENSIONS

### Simplifying Extensions

I'm simplifying extensions by making them have runnable logic. 
This should make it easier to create a flexible API.
Also it allows extensions to make decisions at runtime about the final look of something.

- Specification
    - Static parts 
        - The type(s) of plugin (it restricts what APIs the plugin can use)
        - Theming, Templating and Extension UI _can_ be specified statically
    - Dynamic parts 
        - Frontend logic 
        - Backemd logic

- Permission-based Runtime

- API Access 
    - User's Projects
    - Theming
    - Templating
    - Extension UI
        - Page
        - Modal

- Systems and Templates are just a type of extension.

- Specifications that remain
    - Sageflow
    - Projects 
    - Tabs
    - Credentials 

- Dataflow shouldn't be a specification. It could be a log stored in the db or file.
