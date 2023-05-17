import { User } from "./User";
import { Group } from "./Group";
export declare class Task {
    id: number;
    title: string;
    description: string;
    assignee: User;
    group: Group;
    creator: User;
    createdAt: Date;
    dueDate: Date;
    priority: number;
    stage: number;
    attachment: String;
}
