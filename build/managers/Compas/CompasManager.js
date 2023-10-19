"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var CompassModule_1 = __importDefault(require("./CompassModule"));
var Collection_1 = __importDefault(require("./Collection"));
var Profile_1 = __importDefault(require("./Profile"));
var Quests_1 = __importDefault(require("./Quests"));
var UserSchema_1 = __importDefault(require("../../schemas/UserSchema"));
var CompassManager = /** @class */ (function (_super) {
    __extends(CompassManager, _super);
    function CompassManager(user, channel, history, index, message) {
        var _this = _super.call(this, user, channel, history, index, message) || this;
        if (history.length == 0)
            history.push(_this);
        if (!message)
            channel.send("Generating message, wait please:)").then(function (message) {
                _this.message = message;
                _this.generateMessage();
            });
        return _this;
    }
    CompassManager.prototype.embedMessage = function () {
        return new discord_js_1.EmbedBuilder()
            .setTitle("Compass <🧭>")
            .setDescription("**(\uD83D\uDCD9)** to **Collection**\n\n                                                 **(\uD83D\uDC64)** to **Profile**\n\n                                                 **(\uD83C\uDFB5)** to **Quests**\n\n                                                 **(\u2795)** to **New player**")
            // .setAuthor({ name: `${this.user.username}#${this.user.discriminator}`})
            .setColor("#2F3136");
    };
    CompassManager.prototype.generateMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var embed, emojies;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        embed = this.embedMessage();
                        // await this.message.edit("_");
                        return [4 /*yield*/, this.message.edit({ embeds: [embed], content: "" })];
                    case 1:
                        // await this.message.edit("_");
                        _a.sent();
                        emojies = [];
                        console.log(this.history.length - 1, this.index);
                        if (this.history.length - 1 < this.index)
                            emojies.push("⬅️");
                        emojies.push("📙", "👤", "🎵", "➕");
                        emojies.map(function (emoji) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.message.react(emoji)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        }); }); });
                        this.setupCollector();
                        return [2 /*return*/];
                }
            });
        });
    };
    CompassManager.prototype.regenerateMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.message.edit({ embeds: [this.embedMessage()] });
                return [2 /*return*/];
            });
        });
    };
    CompassManager.prototype.setupCollector = function () {
        var _this = this;
        var filter = function (reaction, user) {
            return ["⬅️", "📙", "👤", "🎵", "➕"].includes(reaction.emoji.name) && user.id === _this.user.id;
        };
        var collector = this.message.createReactionCollector({ filter: filter, time: 15000 });
        collector.on("collect", function (reaction, user) {
            switch (reaction.emoji.name) {
                case "📙":
                    _this.pushHistory(new Collection_1.default(_this.user, _this.channel, _this.history, _this.index + 1, _this.message));
                    _this.message.reactions.removeAll();
                    collector.removeAllListeners();
                    break;
                case "👤":
                    _this.pushHistory(new Profile_1.default(_this.user, _this.channel, _this.history, _this.index + 1, _this.message));
                    _this.message.reactions.removeAll();
                    collector.removeAllListeners();
                    break;
                case "🎵":
                    _this.pushHistory(new Quests_1.default(_this.user, _this.channel, _this.history, _this.index + 1, _this.message));
                    _this.message.reactions.removeAll();
                    collector.removeAllListeners();
                    break;
                case "➕":
                    var player = new UserSchema_1.default({
                        userId: _this.user.id
                    });
                    player.save();
                    break;
                case "⬅️":
                    break;
            }
        });
        collector.on("end", function (reason) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.removeMessage();
                collector.removeAllListeners();
                return [2 /*return*/];
            });
        }); });
    };
    return CompassManager;
}(CompassModule_1.default));
exports.default = CompassManager;
