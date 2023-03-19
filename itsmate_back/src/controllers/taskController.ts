
//post

const updateTask = (req: any, res: any) => {
    //return updated or not
    res.json({ updated: true })
}

//get
const getTasksForUser = (req: any, res: any) => {
    //return list of tasks for user
    res.json({ tasks: [] })
}

const getTasksForGroup = (req: any, res: any) => {
    //return list of tasks for group
    res.json({ tasks: [] })
}

const getAllTasks = (req: any, res: any) => {
    //return list of tasks 
    res.json({ tasks: [] })
}

//delete
const deleteTask = (req: any, res: any) => {
    //return deleted or not
    res.json({ success: true })
}

//put
const addTask = (req: any, res: any) => {
    //return created or not
    res.json({ created: true })
}

module.exports = {
    addTask,
    updateTask,
    getTasksForUser,
    getTasksForGroup,
    getAllTasks,
    deleteTask
};