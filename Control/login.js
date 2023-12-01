import express from 'express'
import bcrypt from 'bcryptjs'
import { GetuserByUsername } from '../Model/ConnectToDb.js'
import { Checktoken, genToken } from '../Model/jwt.js'
export const login = express.Router()
login.use(express.json())

login.post("/login", async(req, res, next)=>{
    console.log('====================================');
    console.log(req.body.token);
    console.log('====================================');
    if(req.body.token){
        const token = req.body.token
        const state = Checktoken(token)
        res.send("state: ",state)
        // if(state!=null){
        //     console.log("finish");
        //     res.status(200).send("oke step 1: ",state)
        // }
    }
    const User = await GetuserByUsername(req.body.username)
    console.log(User);
    if(!User){
        res.status(401).send("Account does not exist")
        return
    }
    const Result = await bcrypt.compare(req.body.password, User.password)
    console.log("Result:", Result);
    if(Result){
        const token = await genToken(req, res, next)
        res.send(token)
    }
    else{
        res.send("Incorrect account name or password")
    }
})

