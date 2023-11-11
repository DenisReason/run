import express from 'express'
import {registerRouter} from '../Control/register.js';
import { login } from '../Control/login.js';
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT||3000
const Main = express()

Main.use(cors())
Main.use(registerRouter)
Main.use(login)

Main.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:19006');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

Main.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})