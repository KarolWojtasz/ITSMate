"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.auth = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null || token === undefined)
        return res.status(401).json({ error: "error" });
    jsonwebtoken_1.default.verify(token, process.env.JWTPRIVKEY, (err, email) => {
        if (err)
            return res.status(403).json({ error: "token not veryfied" });
        req.email = email;
        next();
    });
};
exports.auth = auth;
const generateToken = (email) => {
    return jsonwebtoken_1.default.sign(email, process.env.JWTPRIVKEY, { expiresIn: '10' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.js.map