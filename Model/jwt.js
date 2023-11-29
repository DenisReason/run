import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
const secretKey = process.env.KEY
export const genToken = async (req, res, next) => {
    const payload = {
        "username": req.body.username,
        "password": req.body.password
    }
    const token = await jwt.sign(payload, secretKey, { expiresIn: "30s" })
    return token
}

export const Checktoken = async (req, res, next) => {
    try {
        const token = req.body.token
        console.log('====================================');
        console.log(token);
        console.log('====================================');
        const decodedToken =  await jwt.verify(token, secretKey);

        // Trả về đối tượng chứa thông tin xác minh
        return decodedToken;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi xác minh token:', error);
        return null;
    }
}