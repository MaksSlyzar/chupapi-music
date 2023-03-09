"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var playerSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('Player', playerSchema);
