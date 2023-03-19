"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { login, addUser, addGroup, getUsers, getGroups, deleteUser, deleteGroup } = require('./controllers/loginController');
const { updateTask, getTasksForUser, getTasksForGroup, getAllTasks, deleteTask, addTask } = require('./controllers/taskController');
const routes = (0, express_1.Router)();
routes.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
routes.post('/login', login);
routes.put('/addUser', addUser);
routes.put('/addGroup', addGroup);
routes.delete('/deleteUser', deleteUser);
routes.delete('/deleteGroup', deleteGroup);
routes.get('/getUsers', getUsers);
routes.get('/getGroups', getGroups);
routes.post('/updateTask', updateTask);
routes.put('/addTask', addTask);
routes.delete('/deleteTask', deleteTask);
routes.get('/getAllTasks', getAllTasks);
routes.get('/getTasksForUser', getTasksForUser);
routes.get('/getTasksForGroup', getTasksForGroup);
exports.default = routes;
//# sourceMappingURL=routes.js.map