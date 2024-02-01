
//this must be one of the first module to be loaded
const tracer = require('dd-trace').init()
const httpPlugins = ["http", "https", "http2", "fetch"];

//enable allow datadog to intercept
// require("node:http")
// require("node:https")


hooks = { request: intercept }
for (plugin of httpPlugins) {
    tracer.use(plugin, {
        hooks: {request : intercept}
    })

}

function intercept(span, req,res){
    console.log("INTERCEPTED")
}