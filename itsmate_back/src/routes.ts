import { Router } from 'express';

const { login, addUser, addGroup, getUsers, getGroups, deleteUser, deleteGroup } = require('./controllers/loginController');
const { updateTask, getTasksForUser, getTasksForGroup, getAllTasks, deleteTask, addTask } = require('./controllers/taskController');

const routes = Router();

routes.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//loginController
routes.post('/login', login);
routes.put('/addUser', addUser);
routes.put('/addGroup', addGroup);
routes.delete('/deleteUser', deleteUser);
routes.delete('/deleteGroup', deleteGroup);
routes.get('/getUsers', getUsers);
routes.get('/getGroups', getGroups);
//taskController
routes.post('/updateTask', updateTask);
routes.put('/addTask', addTask);
routes.delete('/deleteTask', deleteTask);
routes.get('/getAllTasks', getAllTasks);
routes.get('/getTasksForUser', getTasksForUser);
routes.get('/getTasksForGroup', getTasksForGroup);

export default routes;