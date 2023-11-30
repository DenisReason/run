import express from 'express'
import {registerRouter} from '../Control/register.js';
import { login } from '../Control/login.js';

import dotenv from 'dotenv'
import cors from 'cors'
import {LoginToken} from '../Control/logintoken.js';
dotenv.config()
const PORT = process.env.PORT||3000
const Main = express()

Main.use(cors())
Main.use(LoginToken)
Main.use(registerRouter)
Main.use(login)



Main.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})