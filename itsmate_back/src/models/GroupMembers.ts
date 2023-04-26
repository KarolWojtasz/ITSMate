import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Task } from "./Task";
import { User } from "./User";
import { Group } from "./Group";

@Entity()
export class GroupMember {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    groupId!: number;

    @ManyToOne(() => Group, (group: { members: any; }) => group.members)
    group!: Group;

    @ManyToOne(() => User)
    user!: User;
}