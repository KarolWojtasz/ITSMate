import { Router } from 'express';
import db from "./repository/DataSource";
import { DataSource } from 'typeorm';
import loginController from './controllers/loginController';
import taskController from './controllers/taskController';
import { auth } from './controllers/auth';


export default class myRouter {
    routes: Router;
    database: DataSource;
    loginController: loginController;
    taskController: taskController;
    constructor() {
        this.taskController = new taskController();
        this.loginController = new loginController();

        const initDB = new db();
        this.database = initDB.getInstance();
        this.routes = Router();
        this.routes.use(async (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.routes.get('/getUsers', auth, (req, res) => { this.loginController.getUsers(req, res, this.database) });
        this.routes.put('/addUser', auth, (req, res) => { this.loginController.addUser(req, res, this.database) });
        this.routes.put('/addGroup', auth, (req, res) => { this.loginController.addGroup(req, res, this.database) });
        this.routes.delete('/deleteUser', auth, (req, res) => { this.loginController.deleteUser(req, res, this.database) });
        this.routes.delete('/deleteGroup', auth, (req, res) => { this.loginController.deleteGroup(req, res, this.database) });
        this.routes.delete('/deleteUserFromGroup', auth, (req, res) => { this.loginController.deleteUserFromGroup(req, res, this.database) });
        this.routes.get('/getUsers', auth, (req, res) => { this.loginController.getUsers(req, res, this.database) });
        this.routes.get('/getGroups', auth, (req, res) => { this.loginController.getGroups(req, res, this.database) });
        this.routes.post('/login', (req, res) => { this.loginController.login(req, res, this.database) });
        this.routes.post('/addUserToGroup', auth, (req, res) => { this.loginController.addUserToGroup(req, res, this.database) });
        this.routes.post('/getGroupMembers', auth, (req, res) => { this.loginController.getGroupMembers(req, res, this.database) });

        this.routes.post('/updateTask', auth, (req, res) => { this.taskController.updateTask(req, res, this.database) });
        this.routes.put('/addTask', auth, (req, res) => { this.taskController.addTask(req, res, this.database) });
        this.routes.delete('/deleteTask', auth, (req, res) => { this.taskController.deleteTask(req, res, this.database) });
        this.routes.get('/getAllTasks', auth, (req, res) => { this.taskController.getAllTasks(req, res, this.database) });
        this.routes.post('/getTasksForUser', auth, (req, res) => { this.taskController.getTasksForUser(req, res, this.database) });
        this.routes.post('/getTasksForGroup', auth, (req, res) => { this.taskController.getTasksForGroup(req, res, this.database) });
        this.routes.post('/getTaskDetails', auth, (req, res) => { this.taskController.getTaskDetails(req, res, this.database) });
        this.routes.post('/assignTaskToMe', auth, (req, res) => { this.taskController.assignTaskToMe(req, res, this.database) });


    }
    async getRoutes() {
        return this.routes;
    }
}


