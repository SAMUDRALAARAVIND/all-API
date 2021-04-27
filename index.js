const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const createApiKey = require("./apis/generateapi")
const axios = require("axios")


app.set("views","views")
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))


const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`App is listening on poort ${port}`)
})


app.get("/",(req,resp)=>{
    resp.render("home")
})


//creating a new api key
app.get("/createapikey",(req,resp)=>{
    resp.render("createkey")
})
app.post("/createapikey",(req,resp)=>{
    console.log("requested")
    var data = req.body;
    var newUser = new createApiKey(data)
    newUser.generateApiKey((result)=>{
       if(result=="User already exists")
            resp.redirect(`/apikey/success?apikey=failed`)
       else
            resp.redirect(`/apikey/success?apikey=${result}`)
    })
})
app.get("/apikey/success",(req,resp)=>{
    var apiKey = req.query.apikey
    if(apiKey=="failed"){
        resp.send("<h1>User already exists please try with another email</h1><br><a href='/../createapikey'>Try again...</a>")
    }
    else 
        resp.send(`<h1>Congratulations!</h1><br>Your API key is: <b>${apiKey}</b>`)
})