import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
const secretKey = process.env.KEY
export const genToken = async (req, res, next) => {
    const payload = {
        "username": req.body.username,
        "password": req.body.password
    }
    const token = await jwt.sign(payload, secretKey)
    return token
}

export const Checktoken = async (req ,res, next) => {
    try {
        let token = req.body.token
        await jwt.verify(token, secretKey,(err, decode)=>{
            if(err){
                res.status(500).send("Token Wrong!!")
            }
            else {
                console.log("here")
                console.log('====================================');
                console.log("decode:", decode);
                const newpayload = {username:decode.username,password:decode.password}
                console.log('====================================');
                const  Newtoken = jwt.sign(newpayload,secretKey,{expiresIn:"30s"})
                console.log(Newtoken);
                if(Newtoken){
                    res.status(200).send(Newtoken)
                }
            }
        });

        // Trả về đối tượng chứa thông tin xác min
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi xác minh token:', error);
        res.status(500).error(error)
    }
}