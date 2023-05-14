"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Group_1 = require("../models/Group");
const Task_1 = require("../models/Task");
const GroupMembers_1 = require("../models/GroupMembers");
const User_1 = require("../models/User");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
class AppDataSource {
    instance;
    constructor() {
        this.instance = new typeorm_1.DataSource({
            type: "postgres",
            host: process.env.DB_SERVER,
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [Group_1.Group, Task_1.Task, GroupMembers_1.GroupMember, User_1.User],
            synchronize: true,
            logging: false,
        });
        this.instance.initialize()
            .then(() => {
            console.log("db running");
        })
            .catch((error) => console.log(error));
    }
    getInstance() {
        return this.instance;
    }
}
exports.default = AppDataSource;
//# sourceMappingURL=DataSource.js.map