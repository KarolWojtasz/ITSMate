"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Group_1 = require("./Group");
let Task = class Task {
    id;
    title;
    description;
    assignee;
    group;
    creator;
    createdAt;
    dueDate;
    priority;
    stage;
    attachment;
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Task.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User || null),
    tslib_1.__metadata("design:type", User_1.User)
], Task.prototype, "assignee", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Group_1.Group),
    tslib_1.__metadata("design:type", Group_1.Group)
], Task.prototype, "group", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User || null),
    tslib_1.__metadata("design:type", User_1.User)
], Task.prototype, "creator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: "timestamp with time zone" }),
    tslib_1.__metadata("design:type", Date)
], Task.prototype, "dueDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Task.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Task.prototype, "stage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "attachment", void 0);
Task = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Task);
exports.Task = Task;
//# sourceMappingURL=Task.js.map