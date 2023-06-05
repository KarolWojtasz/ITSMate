"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const DataSource_1 = tslib_1.__importDefault(require("./repository/DataSource"));
const loginController_1 = tslib_1.__importDefault(require("./controllers/loginController"));
const taskController_1 = tslib_1.__importDefault(require("./controllers/taskController"));
const auth_1 = require("./controllers/auth");
class myRouter {
    routes;
    database;
    loginController;
    taskController;
    constructor() {
        this.taskController = new taskController_1.default();
        this.loginController = new loginController_1.default();
        const initDB = new DataSource_1.default();
        this.database = initDB.getInstance();
        this.routes = (0, express_1.Router)();
        this.routes.use(async (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.routes.get('/getUsers', auth_1.auth, (req, res) => { this.loginController.getUsers(req, res, this.database); });
        this.routes.put('/addUser', auth_1.auth, (req, res) => { this.loginController.addUser(req, res, this.database); });
        this.routes.put('/addGroup', auth_1.auth, (req, res) => { this.loginController.addGroup(req, res, this.database); });
        this.routes.delete('/deleteUser', auth_1.auth, (req, res) => { this.loginController.deleteUser(req, res, this.database); });
        this.routes.delete('/deleteGroup', auth_1.auth, (req, res) => { this.loginController.deleteGroup(req, res, this.database); });
        this.routes.delete('/deleteUserFromGroup', auth_1.auth, (req, res) => { this.loginController.deleteUserFromGroup(req, res, this.database); });
        this.routes.get('/getUsers', auth_1.auth, (req, res) => { this.loginController.getUsers(req, res, this.database); });
        this.routes.get('/getGroups', auth_1.auth, (req, res) => { this.loginController.getGroups(req, res, this.database); });
        this.routes.post('/login', (req, res) => { this.loginController.login(req, res, this.database); });
        this.routes.post('/addUserToGroup', auth_1.auth, (req, res) => { this.loginController.addUserToGroup(req, res, this.database); });
        this.routes.post('/getGroupMembers', auth_1.auth, (req, res) => { this.loginController.getGroupMembers(req, res, this.database); });
        this.routes.post('/updateTask', auth_1.auth, (req, res) => { this.taskController.updateTask(req, res, this.database); });
        this.routes.put('/addTask', auth_1.auth, (req, res) => { this.taskController.addTask(req, res, this.database); });
        this.routes.delete('/deleteTask', auth_1.auth, (req, res) => { this.taskController.deleteTask(req, res, this.database); });
        this.routes.get('/getAllTasks', auth_1.auth, (req, res) => { this.taskController.getAllTasks(req, res, this.database); });
        this.routes.post('/getTasksForUser', auth_1.auth, (req, res) => { this.taskController.getTasksForUser(req, res, this.database); });
        this.routes.post('/getTasksForGroup', auth_1.auth, (req, res) => { this.taskController.getTasksForGroup(req, res, this.database); });
        this.routes.post('/getTaskDetails', auth_1.auth, (req, res) => { this.taskController.getTaskDetails(req, res, this.database); });
        this.routes.post('/assignTaskToMe', auth_1.auth, (req, res) => { this.taskController.assignTaskToMe(req, res, this.database); });
    }
    async getRoutes() {
        return this.routes;
    }
}
exports.default = myRouter;
//# sourceMappingURL=routes.js.map