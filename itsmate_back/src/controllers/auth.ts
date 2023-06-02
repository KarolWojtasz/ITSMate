import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from ".././models/User";
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const auth = (req: any, res: any, next: NextFunction) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null || token === undefined) return res.status(401).json({ error: "no token provided" });
    jwt.verify(token, process.env.JWTPRIVKEY as string, (err: any, user: any) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ error: "token not verified" });
        }
        req.user = user;
        next();
    })
}
const generateToken = (user: User) => {
    return jwt.sign({ user: JSON.stringify(user) }, process.env.JWTPRIVKEY as string, { expiresIn: '1d' })
}
export { auth, generateToken }
