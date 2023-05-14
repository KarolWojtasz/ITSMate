"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require(".././models/Task");
class taskController {
    updateTask(req, res, database) {
        res.json({ updated: true });
    }
    async getTasksForUser(req, res, database) {
        res.json({ tasks: [] });
    }
    getTasksForGroup = (req, res, database) => {
        res.json({ tasks: [] });
    };
    getAllTasks = (req, res, database) => {
        res.json({ tasks: [] });
    };
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
        res.json({ success: true });
    }
    async addTask(req, res, database) {
        const dataJson = req.body;
        const task = new Task_1.Task();
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
                res.status(201).json({ message: "task created" });
            else
                res.status(400).json({ message: "Error creating task" });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }
}
exports.default = taskController;
//# sourceMappingURL=taskController.js.map