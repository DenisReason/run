import express from 'express'
import {registerRouter} from '../Control/register.js';
import { login } from '../Control/login.js';
import dotenv from 'dotenv'
import cors from 'cors'
import { Checktoken } from '../Model/jwt.js';
dotenv.config()
const PORT = process.env.PORT||3000
const Main = express()

Main.use(cors())
Main.use(registerRouter)
Main.use(login)
Main.post("/", Checktoken)


Main.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})