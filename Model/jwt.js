import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
const secretKey = process.env.KEY
export const genToken = async (req, res, next)=>{
    const payload = {
        "username":req.body.username,
        "password":req.body.password
    }
    const token = await jwt.sign(payload, secretKey, {expiresIn:"30s"})
    return token
}