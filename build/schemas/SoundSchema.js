"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var soundSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    date: { type: Number, required: false }
});
exports.default = (0, mongoose_1.model)('Sound', soundSchema);
