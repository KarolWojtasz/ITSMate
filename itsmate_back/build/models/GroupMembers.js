"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMember = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Group_1 = require("./Group");
let GroupMember = class GroupMember {
    id;
    userId;
    groupId;
    group;
    user;
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], GroupMember.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], GroupMember.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], GroupMember.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Group_1.Group, (group) => group.members),
    tslib_1.__metadata("design:type", Group_1.Group)
], GroupMember.prototype, "group", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], GroupMember.prototype, "user", void 0);
GroupMember = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], GroupMember);
exports.GroupMember = GroupMember;
//# sourceMappingURL=GroupMembers.js.map