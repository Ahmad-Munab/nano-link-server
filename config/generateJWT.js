import jwt from 'jsonwebtoken';

const generateJWT = ( _id ) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    })
}

export default  generateJWT 