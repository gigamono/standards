This is doc work in progress. It is a brain dump right now.

### SECURITY

At the core of `secure-runtime` is an `isolate`, a JavaScript vm that does not share memory with other vm instances running in the same process. Shared memory is a recipe for exploits and vulnerabilities; this architecture helps prevent that.

#### Why We Want a Capability-based Secure Runtime

We are in a time where we combine multiple software of different origins and makers to create our own solution. Reuse is great but it comes with security issues as evidenced by the number of CVEs related to [exploits introduced into open-source packages every year](). We let third party packages run on our behalf but we grant them too much power that many of them don't need. This has to change and it is the reason why `secure-runtime` exists.

`secure-runtime` allows only the capabilities the user has allowed for any running module. If a running module tries to access a resource it is not authorized to, an exception is thrown.

There are similar initiatives like [WASI] and [Capsicum].

#### How is This Different from Deno?

`Deno` is indeed similar to `secure-runtime`; both are based on `deno_core`. They both introduce runtime permissions and capability-based security, however `secure-runtime` is designed to have a more granular permission system that is extendable by the developer.

##

### THE RUNTIME

The `runtime::Runtime` is responsible for initializing the JavaScript runtime with necessary state and options.
V8 isolate is not thread-safe, so we can only spawn one isolate per thread. If you are using tokio this means you cannot take advantage of lightweight green threads. You have to use `tokio::task::spawn_local`.

##

### THE EXTENSIONS

A JavaScript runtime by itself is boring because it is a sandboxed vm without access to [system resources]. Typical applications would need access to files, databases, etc. This is achieved with extensions.

##

### THE CAPABILITIES

A capability-based system requires non-forgeable tokens to ensure secure access to resources.

##

### THE LOADERS

## THE GIGAMONO FRAMEWORK
```
+---------------------------------------------Gigamono-Web-Client---+
|                                                                   |
|  +-----------+   +-----------+   +-----------+   +------------+   |
|  |           |   |           |   |           |   |            |   |
|  |           |   |           |   |           |   |            |   |
|  | Extension |   |  Subapp   |   | Extension |   |   Subapp   |   |
|  |           |   |           |   |           |   |            |   |
|  |           |   |           |   |           |   |            |   |
|  +-----------+   +-----------+   +-----------+   +------------+   |
|                                                                   |
+--------------------------------+----------------------------------+
                                 |
                                 |
+--------------------------------v------------Gigamono-Framework----+
|                                                                   |
|                          +-------------+                          |
|                          |             |                          |
|                          |             |                          |
|                          | Engine API  |                          |
|                          |             |                          |
|                          |             |                          |
|                          +-------+-----+                          |
|       +-------------+            |           +-------------+      |
|       |             |            |           |             |      |
|       |             |       +----v---+       |             |      |
|       |   Engine    |       |        |       |   Engine    |      |
|       | Scheduler   <-------+  NATS  +------->   Backend   |      |
|       |             |       +--------+       |             |      |
|       |             |                        |             |      |
|       +-------------+                        +-------------+      |
|                                                                   |
+-------------------------------------------------------------------+
```

The Gigamono Framework executes serverless functions written in JavaScript, but in order to specify how the function should be executed Gigamono needs a manifest file to tell it what to do with the code.

Currently Gigamono only understands 4 types of manifest files:
- extension manifest
- subapp manifest
- scheduled_function manifest
- url_function manifest


### THE ENGINE API

The engine-api is the gateway to the public internet. User requests do not reach the other parts of the Gigamono unless they pass through the engine-api.
The engine-api also acts as a proxy server for engine-backend because it needs to be able to relay request or stream frames as is to the engine-backend to handle. 

