"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true },
    listenedTime: { type: Number, default: 0 }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
