import express from 'express'
import bcrypt from 'bcryptjs'
import { GetuserByUsername } from '../Model/ConnectToDb.js'
import { Checktoken, genToken } from '../Model/jwt.js'
export const login = express.Router()
login.use(express.json())

login.post("/login", async (req, res, next) => {
    let token = req.body.token
    
    if (token) {
        await Checktoken(req, res, next)
        return
    }
    else {
        const User = await GetuserByUsername(req.body.username)
        console.log(User);
        if (!User) {
            res.status(401).send("Account does not exist")
            return
        }
        const Result = await bcrypt.compare(req.body.password, User.password)
        console.log("Result:", Result);
        if (Result) {
            const token = await genToken(req, res, next)
            res.send(token)
        }
        else {
            res.send("Incorrect account name or password")
        }
    }

})

