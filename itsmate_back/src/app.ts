import express from 'express';
import "reflect-metadata";
import myRouter from './routes';
const cors = require('cors');

class App {
    public server;
    constructor() {
        this.server = express();
        this.server.use(cors({
            origin: '*'
        }));
        this.middlewares();
        this.routes();

    }

    middlewares() {
        this.server.use(express.json());
    }

    async routes() {
        const r = await new myRouter().getRoutes();
        this.server.use(r);

    }

}

export default new App().server;

