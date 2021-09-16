/* LIFECYCLE
 *
 * Middleware
 * - You can register a function as a middleware.
 *
 * Extensions
 * - You can regiester Loaded with a subapp.
 *
 *
 */


//------------------- db -------------------

export function from(model: String): Model { return new Model() }

class Model {
  by(id: String): any {}
}
//------------------- fs -------------------

export function open(): File { return new File() }

class File {
  read(): String { return "" }
}

//------------------- memcache -------------------

export function memoryCache(): MemoryCache { return new MemoryCache() }

class MemoryCache {
  set(key: String, value: any) {}
  get(key: String): any {}
}

//------------------- http -------------------

export function request(): Request { return new Request() }

class Request {
  body(): String { return "" }
}

//------------------- introspect -------------------

export function permissions(): String[] { return [] }
export function currentUser(): User { return new User() }

class User {
  id: String
}

//------------------- subapp -------------------
