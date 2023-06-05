import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ default: false })
    isManager!: boolean;

    @OneToMany(() => Task, task => task.assignee)
    assignedTasks!: Task[];

    @OneToMany(() => Task, task => task.creator)
    createdTasks!: Task[];
}
