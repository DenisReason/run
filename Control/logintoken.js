import express from 'express'
import { Checktoken } from '../Model/jwt.js'
export const LoginToken = express.Router()

LoginToken.use(express.json())
LoginToken.post('/', Checktoken)
