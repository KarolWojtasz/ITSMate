import { User } from "./User";
import { Group } from "./Group";
export declare class GroupMember {
    id: number;
    userId: number;
    groupId: number;
    group: Group;
    user: User;
}
