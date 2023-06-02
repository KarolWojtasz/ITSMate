import { NextFunction } from "express";
import { User } from ".././models/User";
declare const auth: (req: any, res: any, next: NextFunction) => any;
declare const generateToken: (user: User) => string;
export { auth, generateToken };
