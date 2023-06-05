import { Task } from "./Task";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    isManager: boolean;
    assignedTasks: Task[];
    createdTasks: Task[];
}
