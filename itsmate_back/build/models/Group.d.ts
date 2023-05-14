import { Task } from "./Task";
import { User } from "./User";
export declare class Group {
    id: number;
    name: string;
    tasks: Task[];
    members: User[];
}
