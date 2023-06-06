import { GroupMember } from ".././models/GroupMembers";
import { Group } from ".././models/Group";
import { User } from ".././models/User";
import { DataSource } from "typeorm";
import { generateToken } from "./auth";
import jwt from "jsonwebtoken";
import { Task } from ".././models/Task";

const bcrypt = require("bcrypt")

export default class loginController {
    //post
    async login(req: any, res: any, database: DataSource) {
        try {

            const email = req.body.email;
            const repo = database.getRepository(User)
            await repo.findOneBy({
                email: email
            }).then(async (data) => {
                if (data != null) {
                    bcrypt.compare(req.body.password, data.password, (err: any, comparison: any) => {
                        //if error than throw error
                        if (err) {
                            res.status(401).json({ message: "Bad credentials" })
                        }
                        //if both match than you can do anything
                        else if (comparison) {
                            const accessToken = generateToken(data);
                            res.status(200).json({ token: accessToken, userId: data.id, admin: data.isManager })
                        } else {
                            res.status(401).json({ msg: "Invalid credencial" })
                        }

                    })

                } else {
                    res.status(401).json({ message: "Bad credentials" })
                }
            })
        } catch (error) {
            res.status(401).json({ message: "Bad credentials" })
        }

    }

    async addUserToGroup(req: any, res: any, database: DataSource) {
        try {
            const grMember = new GroupMember();
            grMember.groupId = req.body.groupId;
            grMember.userId = req.body.userId;
            if (await database.manager.save(grMember))
                res.status(200).json({ added: true })
            else
                res.status(400).json({ added: false })

        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    async getGroupMembers(req: any, res: any, database: DataSource) {
        try {
            const repo = database.getRepository(GroupMember)
            await repo.find({
                relations: {
                    group: true,
                    user: true
                },
                where: {
                    group: {
                        id: req.body.groupId
                    }
                }

            }).then(async (data) => {
                res.status(200).json({ groupMembers: data })
            })
        } catch (error) {
            res.status(400).json({ message: "error" })
        }
    }

    //get
    async getUsers(req: any, res: any, database: DataSource) {
        //return list of users            
        try {
            const repo = database.getRepository(User)
            const usersList = await repo.find()
            res.status(200).json({ allusers: usersList })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    async getGroups(req: any, res: any, database: DataSource) {
        //return list of groups
        try {
            const repo = database.getRepository(Group)
            const grpList = await repo.find()
            res.status(200).json({ allGroups: grpList })
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    //delete
    async deleteUser(req: any, res: any, database: DataSource) {
        const repo3 = database.getRepository(Task);
        const repo2 = database.getRepository(GroupMember);
        const repo = database.getRepository(User);

        try {
            const tasksToUpdate = await repo3.findBy({ assignee: req.body.userId });
            tasksToUpdate.forEach((task: any) => {
                task.assignee = null;
            });
            await repo3.save(tasksToUpdate);

            const tasksToUpdateAgain = await repo3.findBy({ creator: req.body.userId });
            tasksToUpdateAgain.forEach((task: any) => {
                task.creator = null;
            });
            await repo3.save(tasksToUpdateAgain);

            const membersToRemove = await repo2.findBy({ userId: req.body.userId });
            await repo2.remove(membersToRemove);

            const user = await repo.findOneBy({ id: req.body.userId });
            if (user) {
                await repo.remove(user);
                res.status(200).json({ deleted: true });
            } else {
                res.status(400).json({ deleted: false });
            }
        } catch (error) {
            // Handle error
            res.status(500).json({ error: 'An error occurred' });
        }
    }
    async deleteUserFromGroup(req: any, res: any, database: DataSource) {
        const repo = database.getRepository(GroupMember)
        await repo.findOneBy({
            userId: req.body.userId,
            groupId: req.body.groupId
        }).then(async (data) => {
            if (data != null) {
                await repo.remove(data)
                res.status(200).json({ deleted: true })
            } else {
                res.status(400).json({ deleted: false })

            }
        })
    }
    async deleteGroup(req: any, res: any, database: DataSource) {
        const repo = database.getRepository(GroupMember)
        await repo.findBy({
            groupId: req.body.groupId,
        }).then(async (listtoRemove) => {

            await repo.remove(listtoRemove).then(async () => {
                const repo2 = database.getRepository(Group)
                await repo2.findOneBy({
                    id: req.body.groupId
                }).then(async (group) => {
                    if (group != null) {
                        await repo2.remove(group)
                        res.status(200).json({ deleted: true })
                    } else {
                        res.status(400).json({ deleted: false })
                    }
                })
            })
        })


    }
    //put
    async addUser(req: any, res: any, database: DataSource) {
        const dataJson = req.body;
        const user = new User();
        try {
            if (dataJson.password !== dataJson.passwordConfirm)
                return res.status(400).json({ message: "Error registering user" })
            const repo = database.getRepository(User)
            await repo.findOneBy({
                email: dataJson.email
            }).then(async (usr) => {
                if (usr)
                    return res.status(400).json({ message: "Error registering user" })
                else {
                    user.email = dataJson.email;
                    user.name = dataJson.name;
                    user.isManager = dataJson.isManager;
                    const salt = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(dataJson.password, salt);

                    if (await database.manager.save(user))
                        return res.status(201).json({ message: "registered" })
                    else
                        return res.status(400).json({ message: "Error registering user" })
                }
            })


        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: error })
        }

    }
    async addGroup(req: any, res: any, database: DataSource) {
        const dataJson = req.body;
        console.log(dataJson)
        const group = new Group();
        try {
            group.name = dataJson.name;

            if (await database.manager.save(group))
                res.status(201).json({ message: "group created" })
            else
                res.status(400).json({ message: "Error creating group" })

        } catch (error) {
            res.status(400).json({ message: error })
        }
    }
}
