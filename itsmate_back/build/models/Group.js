"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Task_1 = require("./Task");
const User_1 = require("./User");
let Group = class Group {
    id;
    name;
    tasks;
    members;
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Group.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Group.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Task_1.Task, task => task.group),
    tslib_1.__metadata("design:type", Array)
], Group.prototype, "tasks", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => User_1.User, user => user.id),
    tslib_1.__metadata("design:type", Array)
], Group.prototype, "members", void 0);
Group = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Group);
exports.Group = Group;
//# sourceMappingURL=Group.js.map