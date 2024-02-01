
//this must be one of the first module to be loaded
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