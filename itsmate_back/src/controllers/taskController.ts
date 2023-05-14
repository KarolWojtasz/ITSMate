
import { Task } from ".././models/Task";
import { DataSource, Timestamp } from "typeorm";

export default class taskController {

    //post
    updateTask(req: any, res: any, database: DataSource) {
        res.json({ updated: true })
    }

    //get
    async getTasksForUser(req: any, res: any, database: DataSource) {
        //return list of users

        res.json({ tasks: [] })
    }

    getTasksForGroup = (req: any, res: any, database: DataSource) => {
        //return list of groups
        res.json({ tasks: [] })
    }

    getAllTasks = (req: any, res: any, database: DataSource) => {
        //return deleted or not
        res.json({ tasks: [] })
    }
    //delete
    async deleteTask(req: any, res: any, database: DataSource) {
        const repo = database.getRepository(Task)
        await repo.findOneBy({
            id: req.body.taskId
        }).then(async (data) => {
            if (data != null) {
                await repo.remove(data)
                res.status(200).json({ deleted: true })
            } else {
                res.status(400).json({ deleted: false })

            }
        })
        res.json({ success: true })
    }
    //put
    async addTask(req: any, res: any, database: DataSource) {
        const dataJson = req.body;
        const task = new Task();
        try {
            task.title = dataJson.title;
            task.description = dataJson.description;
            task.dueDate = dataJson.dueDate;
            task.priority = dataJson.priority;
            task.stage = 0;
            task.attachment = dataJson.attachment;
            task.creator = dataJson.userId;
            task.group = dataJson.groupId;

            if (await database.manager.save(task))
                res.status(201).json({ message: "task created" })
            else
                res.status(400).json({ message: "Error creating task" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
        }
    }
}
