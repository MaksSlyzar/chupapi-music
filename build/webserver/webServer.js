"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT;
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
app.get('/p', function (req, res) {
    res.send('Express + TypeScript Server');
    console.log("d");
});
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
