import { Router } from 'express';
import { DataSource } from 'typeorm';
import loginController from './controllers/loginController';
import taskController from './controllers/taskController';
export default class myRouter {
    routes: Router;
    database: DataSource;
    loginController: loginController;
    taskController: taskController;
    constructor();
    getRoutes(): Promise<Router>;
}
