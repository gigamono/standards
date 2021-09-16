//------------------- db -------------------

export function connect(): DB { return new DB() }

class DB {
  model(): Model { return new Model() }
}

class Model {}

//------------------- fs -------------------

export function open(): File { return new File() }

class File {
  read(): String { return "" }
}

//------------------- cache -------------------

export function memoryCache(): MemoryCache { return new MemoryCache() }
export function volumeCache(): VolumeCache { return new VolumeCache() }

class MemoryCache {
  set(key: String, value: any) {}
  get(key: String): any {}
}

class VolumeCache {
  set(path: String, value: String) {}
  get(path: String): String { return "" }
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

//------------------- extension -------------------
