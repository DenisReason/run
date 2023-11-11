import express from 'express'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import { GetuserByUsername } from '../Model/ConnectToDb.js'
import { genToken } from '../Model/jwt.js'
export const login = express.Router()

login.use(cors())


login.post("/login", async (req, res, next) => {
    const User = await GetuserByUsername(req.body.username)
    if (!User) {
        res.status(401).send('Account does not exist')
        return
    }
    const Result = await bcrypt.compare(req.body.password, User.password)

    if (Result) {
        const token = await genToken(req, res, next)
        res.setHeader('Authorization', `Bearer ${token}`)
        res.status(200).send(token)
        
    }

    else {
        res.status(500).send("Incorrect account name or password")
    }
})

