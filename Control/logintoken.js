import express from 'express'
import { Checktoken } from '../Model/jwt.js'
export const LoginToken = express.Router()

LoginToken.post('/', async (req, res, next)=>{
    await Checktoken(req, res, next)
})
