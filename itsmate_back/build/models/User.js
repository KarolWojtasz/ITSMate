"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Task_1 = require("./Task");
let User = class User {
    id;
    name;
    email;
    password;
    isManager;
    assignedTasks;
    createdTasks;
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isManager", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Task_1.Task, task => task.assignee),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "assignedTasks", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Task_1.Task, task => task.creator),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "createdTasks", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map