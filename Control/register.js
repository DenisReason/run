import express, { json } from "express"
import { CreateUserAccount, GetuserByUsername } from "../Model/ConnectToDb.js"
import bcrypt from 'bcrypt'
export const registerRouter = express.Router()

registerRouter.use(express.json())

registerRouter.post("/Register", async (req, res, next)=>{


    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const password  = await bcrypt.hash(req.body.password, salt)
    const isAlreadyExist = await GetuserByUsername(req.body.username)
    if(isAlreadyExist){
        res.status(403).send("username already exist")
        return
    }
    await CreateUserAccount({"username":req.body.username,"password":password})
    res.send("done")
})

