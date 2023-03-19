"use strict";
const login = (req, res) => {
    res.json({ logged: true });
};
const getUsers = (req, res) => {
    res.json({ users: [] });
};
const getGroups = (req, res) => {
    res.json({ groups: [] });
};
const deleteUser = (req, res) => {
    res.json({ success: true });
};
const deleteGroup = (req, res) => {
    res.json({ success: true });
};
const addUser = (req, res) => {
    res.json({ registered: true });
};
const addGroup = (req, res) => {
    res.json({ success: true });
};
module.exports = {
    login,
    addUser,
    addGroup,
    getUsers,
    getGroups,
    deleteUser,
    deleteGroup
};
//# sourceMappingURL=loginController.js.map