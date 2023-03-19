"use strict";
const updateTask = (req, res) => {
    res.json({ updated: true });
};
const getTasksForUser = (req, res) => {
    res.json({ tasks: [] });
};
const getTasksForGroup = (req, res) => {
    res.json({ tasks: [] });
};
const getAllTasks = (req, res) => {
    res.json({ tasks: [] });
};
const deleteTask = (req, res) => {
    res.json({ success: true });
};
const addTask = (req, res) => {
    res.json({ created: true });
};
module.exports = {
    addTask,
    updateTask,
    getTasksForUser,
    getTasksForGroup,
    getAllTasks,
    deleteTask
};
//# sourceMappingURL=taskController.js.map