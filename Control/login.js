import express from 'express'
import bcrypt from 'bcryptjs'
import { GetuserByUsername } from '../Model/ConnectToDb.js'
import { genToken } from '../Model/jwt.js'
export const login = express.Router()


login.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Cho phép mọi nguồn gốc
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST'); // Cho phép các phương thức
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cho phép các headers
    next();
  });

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

