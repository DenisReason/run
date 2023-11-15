import express from 'express'
import bcrypt from 'bcryptjs'
import { GetuserByUsername } from '../Model/ConnectToDb.js'
import { genToken } from '../Model/jwt.js'
export const login = express.Router()

login.post("/login", async(req, res, next)=>{
    const User = await GetuserByUsername(req.body.username)
    if(User){
        
    }
    const Result = await bcrypt.compare(req.body.password, User.password)
    if(Result){
        const token = genToken(Result)
        res.status(200).send(token)
    }
    else{
        res.send("Incorrect account name or password")
    }
})

