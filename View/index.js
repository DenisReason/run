import express from 'express'
import {registerRouter} from '../Control/register.js';
import { login } from '../Control/login.js';
import { Server} from 'socket.io';
import http from 'http'


import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT||3000
const Main = express()
const server = http.createServer(Main)
const io = new Server(server)
Main.use(cors({
    origin:"http://localhost:19006",
    methods:["GET", "POST"]
}))
Main.use(registerRouter)
Main.use(login)




io.on('connection', (socket)=>{
    console.log("Client Connect: ", socket.id);

    socket.on('message', (msg)=>{
        console.log('message: ',msg);
        socket.emit('message', (msg))
    })
})



server.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})