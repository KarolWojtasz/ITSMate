"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require(".././models/User");
const Task_1 = require(".././models/Task");
const Group_1 = require(".././models/Group");
class taskController {
    async updateTask(req, res, database) {
        const repo = database.getRepository(Task_1.Task);
        await repo.findOneBy({
            id: req.body.taskId
        }).then(async (data) => {
            if (data != null) {
                data.stage = data.stage + req.body.status;
                if (data.stage <= 4 && data.stage >= 0) {
                    await repo.save(data);
                    res.status(200).json({ updated: true });
                }
                else
                    res.status(400).json({ updated: false });
            }
            else {
                res.status(400).json({ updated: false });
            }
        });
    }
    async getTasksForUser(req, res, database) {
        try {
            const repo2 = database.getRepository(Task_1.Task);
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
            res.status(200).json({ tasks: grpList });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async getTasksForGroup(req, res, database) {
        try {
            const repo2 = database.getRepository(Task_1.Task);
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
            res.status(200).json({ tasks: grpList });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async getAllTasks(req, res, database) {
        try {
            const repo = database.getRepository(Task_1.Task);
            const taskList = await repo.find();
            res.status(200).json({ tasks: taskList });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async deleteTask(req, res, database) {
        const repo = database.getRepository(Task_1.Task);
        await repo.findOneBy({
            id: req.body.taskId
        }).then(async (data) => {
            if (data != null) {
                await repo.remove(data);
                res.status(200).json({ deleted: true });
            }
            else {
                res.status(400).json({ deleted: false });
            }
        });
    }
    async addTask(req, res, database) {
        const dataJson = req.body;
        console.log(req.body);
        const repo = database.getRepository(User_1.User);
        await repo.findOneBy({
            id: dataJson.userId
        }).then(async (user) => {
            if (user != null) {
                const task = new Task_1.Task();
                try {
                    task.title = dataJson.title;
                    task.description = dataJson.description;
                    task.dueDate = dataJson.dueDate;
                    task.priority = dataJson.priority;
                    task.attachment = dataJson.attachment;
                    task.creator = user;
                    task.stage = 0;
                    console.log(task);
                    const repo2 = database.getRepository(Group_1.Group);
                    await repo2.findOneBy({
                        id: dataJson.groupId
                    }).then(async (group) => {
                        if (group != null) {
                            try {
                                task.group = group;
                                if (await database.manager.save(task))
                                    res.status(201).json({ message: "task created" });
                                else
                                    res.status(400).json({ message: "Error creating task" });
                            }
                            catch (error) {
                                console.log(error);
                                res.status(400).json({ message: error });
                            }
                        }
                        else {
                            res.status(400).json({ message: "error creating task" });
                        }
                    });
                }
                catch (error) {
                    console.log(error);
                    res.status(400).json({ message: error });
                }
            }
            else {
                res.status(400).json({ added: false });
            }
        });
    }
}
exports.default = taskController;
//# sourceMappingURL=taskController.js.map