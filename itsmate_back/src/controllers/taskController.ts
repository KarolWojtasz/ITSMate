
import { User } from ".././models/User";
import { Task } from ".././models/Task";
import { DataSource, FindOperator, Timestamp } from "typeorm";
import { Group } from ".././models/Group";

export default class taskController {

    //post
    async updateTask(req: any, res: any, database: DataSource) {
        const repo = database.getRepository(Task)
        await repo.findOneBy({
            id: req.body.taskId
        }).then(async (data) => {
            if (data != null) {
                data.stage = data.stage + req.body.status;
                if (data.stage <= 4 && data.stage >= 0) {
                    await repo.save(data)
                    res.status(200).json({ updated: true })
                } else
                    res.status(400).json({ updated: false })

            } else {
                res.status(400).json({ updated: false })
            }
        })

    }

    //get
    async getTasksForUser(req: any, res: any, database: DataSource) {
        try {
            const repo2 = database.getRepository(Task)
            const grpList = await repo2.find({
                relations: {
                    assignee: true
                },
                where: {
                    assignee: {
                        id: req.body.userId
                    }

                }
            });

            res.status(200).json({ tasks: grpList })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    async getTasksForGroup(req: any, res: any, database: DataSource) {
        try {
            const repo2 = database.getRepository(Task)
            const grpList = await repo2.find({
                relations: {
                    group: true
                },
                where: {
                    group: {
                        id: req.body.groupId
                    }

                }
            });

            res.status(200).json({ tasks: grpList })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    async getAllTasks(req: any, res: any, database: DataSource) {
        try {
            const repo = database.getRepository(Task)
            const taskList = await repo.find()
            res.status(200).json({ tasks: taskList })
        } catch (error) {
            res.status(400).json({ message: error })
        }
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
    }
    //put
    async addTask(req: any, res: any, database: DataSource) {
        const dataJson = req.body;
        console.log(req.body)
        const repo = database.getRepository(User)
        await repo.findOneBy({
            id: dataJson.userId
        }).then(async (user) => {
            if (user != null) {
                const task = new Task();
                try {
                    task.title = dataJson.title;
                    task.description = dataJson.description;
                    task.dueDate = dataJson.dueDate;
                    task.priority = dataJson.priority;
                    task.attachment = dataJson.attachment;
                    task.creator = user;
                    task.stage = 0;
                    console.log(task)
                    const repo2 = database.getRepository(Group)
                    await repo2.findOneBy({
                        id: dataJson.groupId
                    }).then(async (group) => {
                        if (group != null) {
                            try {
                                task.group = group;
                                if (await database.manager.save(task))
                                    res.status(201).json({ message: "task created" })
                                else
                                    res.status(400).json({ message: "Error creating task" })

                            } catch (error) {
                                console.log(error)
                                res.status(400).json({ message: error })
                            }

                        } else {
                            res.status(400).json({ message: "error creating task" })
                        }
                    })

                } catch (error) {
                    console.log(error)
                    res.status(400).json({ message: error })
                }

            } else {
                res.status(400).json({ added: false })
            }
        })


    }
}
