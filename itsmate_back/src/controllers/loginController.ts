
//post
const login = (req: any, res: any) => {
    //return logged or not
    res.json({ logged: true })
}
//get
const getUsers = (req: any, res: any) => {
    //return list of users
    res.json({ users: [] })
}

const getGroups = (req: any, res: any) => {
    //return list of groups
    res.json({ groups: [] })
}

//delete
const deleteUser = (req: any, res: any) => {
    //return deleted or not
    res.json({ success: true })
}
const deleteGroup = (req: any, res: any) => {
    //return deleted or not
    res.json({ success: true })
}
//put
const addUser = (req: any, res: any) => {
    //return registered or not
    res.json({ registered: true })
}
const addGroup = (req: any, res: any) => {
    //return group added or not
    res.json({ success: true })
}
module.exports = {
    login,
    addUser,
    addGroup,
    getUsers,
    getGroups,
    deleteUser,
    deleteGroup
};