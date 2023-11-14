import express from 'express'
import bcrypt from 'bcryptjs'
import { GetuserByUsername } from '../Model/ConnectToDb.js'
export const login = express.Router()

login.post("/login", async(req, res, next)=>{
    const User = await GetuserByUsername(req.body.username)
    console.log(User);
    const Result = await bcrypt.compare(req.body.password, User.password)
    console.log(Result)
    if(Result){
        res.send(User)
    }
    else{
        res.send("Incorrect account name or password")
    }
})

