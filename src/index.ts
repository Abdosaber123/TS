import { log } from "console"
import express from "express"
import { bootsrap } from "./app.controller"
import { config } from "dotenv"
config({path: "./config/local.env"})
const app = express()
bootsrap(app , express)
const port = 3000
app.listen(port , ()=>{
    log("server is running on port " , port)
})
