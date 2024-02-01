# Introduction

this repo simulates the issue that plugin customization does not work with the node-fetch. 

# Run
```
npm install 
node -r ./datadog.cjs index.mjs 
```
Expected: normally it possible to configure datadog to intercept all http requests and augment the span 
this can be done via `trace.use` function and defining intecept function on the [hooks of the datadog http plugin](https://datadoghq.dev/dd-trace-js/interfaces/plugins.http.html#hooks). 
```
const tracer = require('dd-trace').init()
const httpPlugins = ["http", "https", "http2", "fetch"];
hooks = { request: intercept }
for (plugin of httpPlugins) {
    tracer.use(plugin, {
        hooks: {request : (span, req,res) =>   console.log("INTERCEPTED")}
    })

}
```
When you run this we expect an output of 
```
INTERCEPTED
status: 200
```
Actual
```
status: 200
```

To fix this issue I added follow 2 lines require('http') and require('https') after the tracer initialization (tracer/init) see code.
when you run it now it will work

```
const tracer = require('dd-trace').init()


//enable allow datadog to intercept
 require("node:http")
 require("node:https")

const httpPlugins = ["http", "https", "http2", "fetch"];

for (plugin of httpPlugins) {
    tracer.use(plugin, {
        hooks: {request : (span, req,res) =>   console.log("INTERCEPTED")}
    })

}

```