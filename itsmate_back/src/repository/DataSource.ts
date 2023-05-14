import "reflect-metadata"
import { DataSource } from "typeorm"
import { Group } from "../models/Group"
import { Task } from "../models/Task"
import { GroupMember } from "../models/GroupMembers"
import { User } from "../models/User"
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

export default class AppDataSource {
    instance: DataSource;
    constructor() {
        this.instance = new DataSource({
            type: "postgres",
            host: process.env.DB_SERVER,
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [Group, Task, GroupMember, User],
            synchronize: true,
            logging: false,
        })
        this.instance.initialize()
            .then(() => {
                console.log("db running");
            })
            .catch((error) => console.log(error))

    }
    public getInstance() {
        return this.instance;
    }
}