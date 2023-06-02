import { NextFunction } from "express";
declare const auth: (req: any, res: any, next: NextFunction) => any;
declare const generateToken: (email: string) => string;
export { auth, generateToken };
