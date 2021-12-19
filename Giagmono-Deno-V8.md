This is doc work in progress. It is a brain dump right now.

## SECURITY

At the core of `tera` is an `isolate`, a JavaScript vm that does not share memory with other vm instances running in the same process. Shared memory is a recipe for exploits and vulnerabilities; this architecture helps prevent that.

#### Why we want capability-based security

We are in a time where we combine multiple software of different origins and makers to create our own solution. Reuse is great but it comes with security issues as evidenced by the number of CVEs related to [exploits introduced into open-source packages every year](). We let third party packages run on our behalf but we grant them too much power that many of them don't need. This has to change and it is the reason why `tera` exists.

`tera` allows only the capabilities the user has allowed for any running module. If a running module tries to access a resource it is not authorized to, an exception is thrown.

There are similar initiatives like [WASI] and [Capsicum].

#### How we protect against bad tenants

**Permissions**

At the heart of tera's capability-based system is permissions. This is how the user chooses what type of resources or actions an isolate is allowed to make. tera not only implements handy permission-enabled host APIs but it also allows the user to extend the system with their own permission types.

```rs
let allow_list = [PathString("./examples/txt".into())];

let permissions = Permissions::builder()
    .add_permissions(&[
        (Fs::Open, &allow_list),
        (Fs::Read, &allow_list)
    ])
    .build();

let mut runtime = Runtime::default_main(permissions).await?;

runtime
    .execute_module(filename, code)
    .await
```

**Memory Exhaustion**

We register a callback with V8 using `add_near_heap_limit_callback`. This calls a function that panics when the Isolate heap is about to reach its limit.

It is still possible to call into Rust code, through host functions and exhaust the memory from the Rust side. This is why any host functions that require reading from or writing significant number of bytes to memory need to be closely monitored.

tera uses a streaming interface for host functions that can write significant bytes to memory. This means system resources like files and socket that have the read-write interface can only implement `read`, `write` functions that reads or writes only a single chunk of the stream to memory. And with bytes progressively written to V8 memory, tera can leverage v8 heap limit detector to determine the best course of action when memory limit is about to be reached.

As for reading bytes from V8 memory into the Rust memory, this is still a potential attack vector. tera does not have a nice solution to that yet.

https://groups.google.com/g/v8-users/c/qLs7-XT2Zvg

## DENO_CORE

`tera` builds on `deno_core`, a bare-bones JavaScript runtime.

`tera::Runtime` initializing the JavaScript runtime with default or user-specified state and options. It sets the permission and adds handles some resource-related task like specifying

V8 isolate is not thread-safe, so we can only spawn one isolate per thread. If you are using tokio this means you cannot take advantage of lightweight green threads. You have to use `tokio::task::spawn_local`.

### THE EXTENSIONS

A JavaScript runtime by itself is boring because it is a sandboxed vm without access to system resources. Typical applications would need access to the file sytem, socket, databases, etc. This is achieved through extensions in deno_core. Extensions allow us to extend the functionality of the JavaScript runtime and it provides a single data pipeline into the runtime. This property makes deno_core a lot more secure than poking holes arbitrarily into the v8 runtime.

To facilitate communication between an extension and v8, deno_core uses [serde_v8](https://crates.io/crates/serde_v8), a library that maps Rust values to and from v8 values, so that your extension implementation end up looking like this:

```rs
async fn op_fs_open(
    state: Rc<RefCell<OpState>>,
    path: String,
    options: FileOptions,
) -> Result<ResourceId, AnyError> {
    // ...
}
```

For the most part, values are copied between the two worlds but there are times when you need to hold a reference to some typed array in an isolate's memory to prevent expensive copies. serde_v8 implements a `ZeroCopyBuf` that facilitates that.

**State, Resource Table, Capability System**

Everytime your extension function is called, deno_core passes a reference to state object (`state: Rc<RefCell<OpState>>` in the example above) as the first argument of the function. This allows you to store stateful things that you use across calls to your extension function.

To make this seamless, `deno_core` uses a `ResourceTable` that contains a `BTreeMap<ResourceId, Rc<dyn Resource>>` giving each resource that implements the `Resource` trait a unique id.

The ResourceTable is what makes the capability-based system possible. The `resource id` is the token an isolate uses to access a resource. While the id itself is not unique, its reference is non-forgeable because isolate don't have access to the same resource table.

**Write-Read Resource**

A lot of the resources tend to have read or write functionality, so deno_core `Resource` trait implements read, write, close functions. This means you can implement all-in-one `read`, `read` and `close` ops that can take any resource implementing the functions and that is what deno did.

```js
let f = open("samples.txt", { create: true }); // open returns a sys.File.
let chunk = sys.read(f.rid); // sys.read is a generic read function that can read from any dyn Resource.
```

The problem however is that the interface that these functions expose is not adequate for the kind of permission system tera is aiming for. They do not expose `OpState` which contains permissions object needed for validating reads and writes. deno simply checks for all the permissions including read and write ahead of time, when the resource is created and allocated. This works for files because the OS requires users to specify read and/or write permission at open/creation time, but it does not work for sockets which have no such mechanism. This means for sockets, we still need to check for permission during read or write.

On the other hand, even if these functions were to expose `OpState`, using just them alone in a `readAll`/`writeAll` implementations is going to result in repeated expensive unecessary permission checks. So ideally, we would need `read_no_check` and `write_no_check` to accompany `read`/`write` functions of Resource so checks are only done once for a `readAll` or `writeAll` implementation.

At the end of the day, `tera` opted for not using Resource read and write functions, so we implement Resource-specific `read` and `write` functions and defer the genericity to the JavaScript postcript files. There we can have `Writer`, `Reader`, etc. interfaces that resources like `File` and `Socket` can implement.

##

### THE LOADERS

## GIGAMONO FRAMEWORK

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
