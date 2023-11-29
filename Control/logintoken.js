import express from 'express'
import { Checktoken } from '../Model/jwt.js'
export const LoginToken = express.Router()

LoginToken.post('/', async (req, res, next)=>{
    const data = await Checktoken(req, res, next)
    console.log(data)
    res.send(data)
})
