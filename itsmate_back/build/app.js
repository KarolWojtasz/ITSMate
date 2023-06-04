"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
require("reflect-metadata");
const routes_1 = tslib_1.__importDefault(require("./routes"));
const cors = require('cors');
class App {
    server;
    constructor() {
        this.server = (0, express_1.default)();
        this.server.use(cors({
            origin: '*'
        }));
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express_1.default.json());
    }
    async routes() {
        const r = await new routes_1.default().getRoutes();
        this.server.use(r);
    }
}
exports.default = new App().server;
//# sourceMappingURL=app.js.map