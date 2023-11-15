import express, { json } from "express"
import { CreateUserAccount, GetuserByUsername } from "../Model/ConnectToDb.js"
import bcrypt from 'bcryptjs'

export const registerRouter = express.Router()


registerRouter.use(express.json())

registerRouter.post("/Register", async (req, res, next)=>{
    if(GetuserByUsername(req.body.username)){
        res.status(409).send("This account has already existed")
        return
    }
    const salt = await bcrypt.genSalt(10);
    const password  = await bcrypt.hash(req.body.password, salt)
    await CreateUserAccount({"username":req.body.username,"password":password})
    res.status(200).send("done")
}
)
