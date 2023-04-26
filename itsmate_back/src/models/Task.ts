import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Group } from "./Group";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => User)
    assignee!: User;

    @ManyToOne(() => Group)
    group!: Group;

    @ManyToOne(() => User)
    creator!: User;

    @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp with time zone" })
    dueDate!: Date;

    @Column({ default: 0 })
    priority!: number;

    @Column({ type: "int", nullable: false, default: 0 })
    stage!: number;

    @Column({ type: "bytea", nullable: true })
    attachment!: Buffer;
}