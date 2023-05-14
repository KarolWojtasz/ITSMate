import { Task } from "./Task";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    assignedTasks: Task[];
    createdTasks: Task[];
}
