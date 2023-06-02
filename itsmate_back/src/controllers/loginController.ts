import { GroupMember } from ".././models/GroupMembers";
import { Group } from ".././models/Group";
import { User } from ".././models/User";
import { DataSource } from "typeorm";
import { generateToken } from "./auth";
import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt")

export default class loginController {
    //post
    async login(req: any, res: any, database: DataSource) {
        try {

            const email = req.body.email;
            const user = { email: email }
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
                            res.status(200).json({ token: accessToken })
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
                res.status(200).json({ message: "user assigned to group" })
            else
                res.status(400).json({ message: "Error assigning to group" })

        } catch (error) {
            res.status(400).json({ message: error })
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
        const repo = database.getRepository(User)
        await repo.findOneBy({
            id: req.body.userId
        }).then(async (user) => {
            if (user != null) {
                await repo.remove(user)
                res.status(200).json({ deleted: true })
            } else {
                res.status(400).json({ deleted: false })

            }

        })
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
            user.email = dataJson.email;
            user.name = dataJson.name;
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(dataJson.password, salt);
            if (await database.manager.save(user))
                res.status(201).json({ message: "registered" })
            else
                res.status(400).json({ message: "Error registering user" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
        }

    }
    async addGroup(req: any, res: any, database: DataSource) {
        const dataJson = req.body;
        const group = new Group();
        try {
            group.name = dataJson.name;

            if (await database.manager.save(group))
                res.status(201).json({ message: "group created" })
            else
                res.status(400).json({ message: "Error creating group" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
        }
    }
}
