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

export const Checktoken = async (token) => {
    try {
        console.log(token);
        await jwt.verify(token, secretKey,(err, decode)=>{
            if(err){
                console.log(err);
                return false
            }
            else {
                console.log("here")
                return decode
            }
        });

        // Trả về đối tượng chứa thông tin xác min
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi xác minh token:', error);
        return null;
    }
}