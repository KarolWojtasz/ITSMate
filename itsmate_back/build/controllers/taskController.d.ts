import { DataSource } from "typeorm";
export default class taskController {
    updateTask(req: any, res: any, database: DataSource): Promise<void>;
    getTasksForUser(req: any, res: any, database: DataSource): Promise<void>;
    getTasksForGroup(req: any, res: any, database: DataSource): Promise<void>;
    getAllTasks(req: any, res: any, database: DataSource): Promise<void>;
    deleteTask(req: any, res: any, database: DataSource): Promise<void>;
    addTask(req: any, res: any, database: DataSource): Promise<void>;
}
