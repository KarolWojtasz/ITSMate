import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Task, task => task.group)
    tasks!: Task[];

    @OneToMany(() => User, user => user.id)
    members!: User[];
}
