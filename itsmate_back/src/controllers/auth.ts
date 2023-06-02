import { NextFunction } from "express";
import jwt from "jsonwebtoken";
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const auth = (req: any, res: any, next: NextFunction) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null || token === undefined) return res.status(401).json({ error: "error" });

    jwt.verify(token, process.env.JWTPRIVKEY as string, (err: any, email: any) => {
        if (err) return res.status(403).json({ error: "token not veryfied" });
        req.email = email;
        next();
    })
}
const generateToken = (email: string) => {
    return jwt.sign(email, process.env.JWTPRIVKEY as string, { expiresIn: '10' })
}
export { auth, generateToken }
