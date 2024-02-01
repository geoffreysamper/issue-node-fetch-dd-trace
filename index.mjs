
import fetch from "node-fetch"




let url = "http://httpbin.org/get"
fetch(url).then( (res) =>
    console.log("status: " , res.status)
)

