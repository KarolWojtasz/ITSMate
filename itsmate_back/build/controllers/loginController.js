"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GroupMembers_1 = require(".././models/GroupMembers");
const Group_1 = require(".././models/Group");
const User_1 = require(".././models/User");
const bcrypt = require("bcrypt");
class loginController {
    login(req, res, database) {
        res.json({ logged: true });
    }
    async addUserToGroup(req, res, database) {
        console.log("XD");
        try {
            const grMember = new GroupMembers_1.GroupMember();
            grMember.groupId = req.body.groupId;
            grMember.userId = req.body.userId;
            if (await database.manager.save(grMember))
                res.status(200).json({ message: "user assigned to group" });
            else
                res.status(400).json({ message: "Error assigning to group" });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async getUsers(req, res, database) {
        try {
            const repo = database.getRepository(User_1.User);
            const usersList = await repo.find();
            res.status(200).json({ allusers: usersList });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async getGroups(req, res, database) {
        try {
            const repo = database.getRepository(Group_1.Group);
            const grpList = await repo.find();
            res.status(200).json({ allGroups: grpList });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async deleteUser(req, res, database) {
        const repo = database.getRepository(User_1.User);
        await repo.findOneBy({
            id: req.body.userId
        }).then(async (user) => {
            if (user != null) {
                await repo.remove(user);
                res.status(200).json({ deleted: true });
            }
            else {
                res.status(400).json({ deleted: false });
            }
        });
    }
    async deleteUserFromGroup(req, res, database) {
        const repo = database.getRepository(GroupMembers_1.GroupMember);
        await repo.findOneBy({
            userId: req.body.userId,
            groupId: req.body.groupId
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
    async deleteGroup(req, res, database) {
        const repo = database.getRepository(GroupMembers_1.GroupMember);
        await repo.findBy({
            groupId: req.body.groupId,
        }).then(async (listtoRemove) => {
            await repo.remove(listtoRemove).then(async () => {
                const repo2 = database.getRepository(Group_1.Group);
                await repo2.findOneBy({
                    id: req.body.groupId
                }).then(async (group) => {
                    if (group != null) {
                        await repo2.remove(group);
                        res.status(200).json({ deleted: true });
                    }
                    else {
                        res.status(400).json({ deleted: false });
                    }
                });
            });
        });
    }
    async addUser(req, res, database) {
        const dataJson = req.body;
        const user = new User_1.User();
        try {
            user.email = dataJson.email;
            user.name = dataJson.name;
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(dataJson.password, salt);
            if (await database.manager.save(user))
                res.status(201).json({ message: "registered" });
            else
                res.status(400).json({ message: "Error registering user" });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }
    async addGroup(req, res, database) {
        const dataJson = req.body;
        const group = new Group_1.Group();
        try {
            group.name = dataJson.name;
            if (await database.manager.save(group))
                res.status(201).json({ message: "group created" });
            else
                res.status(400).json({ message: "Error creating group" });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }
}
exports.default = loginController;
//# sourceMappingURL=loginController.js.map