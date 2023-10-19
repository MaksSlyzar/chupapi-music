"use strict";
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
var builders_1 = require("@discordjs/builders");
var discord_js_1 = require("discord.js");
var PauseButton_1 = __importDefault(require("./Buttons/PauseButton"));
var NextButton_1 = __importDefault(require("./Buttons/NextButton"));
var TurnButton_1 = __importDefault(require("./Buttons/TurnButton"));
var CheckerButton_1 = __importDefault(require("./Buttons/CheckerButton"));
var PreserveButton_1 = __importDefault(require("./Buttons/PreserveButton"));
function addSpacesToNumber(number) {
    // Перетворюємо число в рядок
    var numStr = number.toString();
    // Розділяємо рядок на групи по три цифри з кінця
    var parts = [];
    var tempPart = "";
    var count = 0;
    for (var i = numStr.length - 1; i >= 0; i--) {
        tempPart = numStr[i] + tempPart;
        count++;
        if (count === 3) {
            parts.unshift(tempPart);
            tempPart = "";
            count = 0;
        }
    }
    if (tempPart.length > 0) {
        parts.unshift(tempPart);
    }
    // З'єднуємо групи з пробілами та повертаємо результат
    var result = parts.join(" ");
    return result;
}
var MusicDescription = /** @class */ (function () {
    function MusicDescription(manager, message) {
        this.manager = manager;
        this.message = message;
    }
    MusicDescription.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var track, title, description, likes, link, views, embed, buttons, row, channel, collector;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                track = this.manager.musicDatas.getTrack();
                if (!track)
                    return [2 /*return*/]; // None track
                title = track.title, description = track.description, likes = track.likes, link = track.link, views = track.views;
                embed = new builders_1.EmbedBuilder()
                    .setTitle("".concat(title))
                    .setDescription("Link: ".concat(link, "\n                                Likes: **").concat(addSpacesToNumber(likes), "**:thumbsup: \n                                Views: **").concat(addSpacesToNumber(views), "**:eyeglasses:\n                                Platform: **").concat(track.platform, "**\n                                BotListened: \n                                Most included: \n                                "))
                    .setColor(0x0099FF)
                    .setAuthor({ name: track.includingUser.username, iconURL: track.includingUser.avatarURL() });
                buttons = [
                    new PreserveButton_1.default(this.manager),
                    new PauseButton_1.default(this.manager),
                    new NextButton_1.default(this.manager),
                    new TurnButton_1.default(this.manager),
                    new CheckerButton_1.default(this.manager)
                ];
                row = (_a = new discord_js_1.ActionRowBuilder())
                    .addComponents.apply(_a, buttons.map(function (button) { return button.buildButton(); }));
                channel = this.message.channel;
                collector = channel.createMessageComponentCollector({});
                collector.on('collect', function (i) { return __awaiter(_this, void 0, void 0, function () {
                    var selectedCustomId, _i, buttons_1, chupapiButton;
                    return __generator(this, function (_a) {
                        selectedCustomId = i.customId;
                        for (_i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                            chupapiButton = buttons_1[_i];
                            if (selectedCustomId == chupapiButton.customId) {
                                chupapiButton.pressed(i, collector);
                            }
                        }
                        return [2 /*return*/];
                    });
                }); });
                collector.on('end', function (collected) { return console.log("Collected ".concat(collected.size, " items")); });
                this.message.edit({ embeds: [embed], components: [row] });
                return [2 /*return*/];
            });
        });
    };
    return MusicDescription;
}());
exports.default = MusicDescription;
