import { Router } from 'express';


const routes = Router();

routes.use(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes.get('/', async (req, res) => {
    res.send("Hello world");
});




export default routes;