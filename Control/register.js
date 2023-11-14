import express, { json } from "express"
import { CreateUserAccount } from "../Model/ConnectToDb.js"
import bcrypt from 'bcryptjs'
export const registerRouter = express.Router()

registerRouter.use(express.json())

registerRouter.post("/Register", async (req, res, next)=>{


    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const password  = await bcrypt.hash(req.body.password, salt)
    await CreateUserAccount({"username":req.body.username,"password":password})
    res.send("done")
})

