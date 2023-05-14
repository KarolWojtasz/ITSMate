import { DataSource } from "typeorm";
export default class loginController {
    login(req: any, res: any, database: DataSource): void;
    addUserToGroup(req: any, res: any, database: DataSource): Promise<void>;
    getUsers(req: any, res: any, database: DataSource): Promise<void>;
    getGroups(req: any, res: any, database: DataSource): Promise<void>;
    deleteUser(req: any, res: any, database: DataSource): Promise<void>;
    deleteUserFromGroup(req: any, res: any, database: DataSource): Promise<void>;
    deleteGroup(req: any, res: any, database: DataSource): Promise<void>;
    addUser(req: any, res: any, database: DataSource): Promise<void>;
    addGroup(req: any, res: any, database: DataSource): Promise<void>;
}
