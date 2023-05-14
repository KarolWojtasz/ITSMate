import "reflect-metadata";
import { DataSource } from "typeorm";
export default class AppDataSource {
    instance: DataSource;
    constructor();
    getInstance(): DataSource;
}
