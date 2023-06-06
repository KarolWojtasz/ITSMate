
import { User } from ".././models/User";
import { Task } from ".././models/Task";
import { ArrayContainedBy, ArrayContains, DataSource, FindOperator, In, Timestamp } from "typeorm";
import { Group } from ".././models/Group";
import { GroupMember } from ".././models/GroupMembers";

export default class taskController {
    //post
    async getTaskDetails(req: any, res: any, database: DataSource) {
        try {
            const repo = database.getRepository(Task)
            await repo.find({

                relations: {
                    assignee: true,
                    group: true,
                    creator: true
                },
                where: {
                    id: req.body.taskId
                }

            }).then(async (data) => {
                res.status(200).json({ taskDetails: data })
            })
        } catch (error) {
            res.status(400).json({ message: "error" })

        }


    }
    //post
    async assignTaskToMe(req: any, res: any, database: DataSource) {
        const repo = database.getRepository(Task)
        await repo.findOneBy({
            id: req.body.taskId
        }).then(async (data) => {
            const repo2 = database.getRepository(User)
            await repo2.findOneBy({
                id: req.body.userId
            }).then(async (data2) => {
                if (data != null && data2 != null) {
                    data.assignee = data2;
                    await repo.save(data)
                    res.status(200).json({ updated: true })
                } else {
                    res.status(400).json({ updated: false })
                }
            })

        })

    }
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

    //post
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
            const repo = database.getRepository(GroupMember)
            const userGroup = await repo.find({
                where: {
                    userId: req.body.userId
                }
            })
            var groupsId = userGroup.map(t => t.groupId);
            console.log(groupsId)

            const repo2 = database.getRepository(Task)
            const grpList = await repo2.find({
                relations: {
                    group: true,
                    assignee: true,
                },
                where: {
                    group: {
                        id: In(groupsId)
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
                    task.priority = 1;
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
