const express = require("express")
const app = express()

app.get("/",(req,resp)=>{
    resp.send("hello world")
})
app.get("/api",(req,resp)=>{
    var data = {
        name:"samudrala aravind",
        age:20,
        college:"NIT warangal"
    }
    console.log("requested");
      resp.send(data)
})
app.post("/fetch",(req,resp)=>{
    var data = {
         items: [
          { "id": 1, "name": "Apples",  "price": "$2" },
          { "id": 2, "name": "Peaches", "price": "$5" }
        ] 
      }
      resp.send(data)
    })
app.listen(8000,()=>{
    console.log(`App is listening on poort 8000`)
})