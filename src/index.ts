import { log } from "console"
import express from "express"
import { bootsrap } from "./app.controller"
import { config } from "dotenv"
import { devConfig } from "./config/env/local.config"
import { initSocket } from "./socket.io"
config()
const app = express()
bootsrap(app , express)
const port = devConfig.DB_PORT
const server = app.listen(port , ()=>{
    log("server is running on port " , port)
})
initSocket(server)