import express from 'express';
import "reflect-metadata";
import myRouter from './routes';

class App {
    public server;
    constructor() {
        this.server = express();

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