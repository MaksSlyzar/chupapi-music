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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var _a = require('discord.js'), ActionRowBuilder = _a.ActionRowBuilder, ButtonBuilder = _a.ButtonBuilder, ButtonStyle = _a.ButtonStyle, Events = _a.Events;
var MusicPlaylist = /** @class */ (function () {
    function MusicPlaylist(manager, message) {
        this.manager = manager;
        this.message = message;
        this.page = 0;
    }
    MusicPlaylist.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var embed, row, maxPages, components, channel, collector;
            var _this = this;
            return __generator(this, function (_a) {
                // return;
                console.log("REFRESH");
                console.log(this.manager.musicDatas.getDiapTracks(this.page * 10, this.page * 10 + 10));
                embed = new discord_js_1.EmbedBuilder()
                    .setTitle("Turn!")
                    .setDescription("".concat(this.manager.musicDatas.getDiapTracks(this.page * 10, this.page * 10 + 10).map(function (track, index) {
                    return "".concat(index === _this.manager.musicDatas.index ?
                        _this.manager.state.play ? "▶️" : "⏸️"
                        : "", "\" ").concat(track.title, "\" added by **").concat(track.includingUser.username, "**\n");
                }).join('\n')));
                row = new ActionRowBuilder();
                maxPages = Math.floor(this.manager.musicDatas.musicList.length / 10);
                console.log(maxPages, "Max pages");
                components = [
                    new ButtonBuilder()
                        .setCustomId('checker')
                        .setLabel('Checker')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('description')
                        .setLabel('Description')
                        .setStyle(ButtonStyle.Secondary),
                ];
                if (this.page != 0)
                    components.push(new ButtonBuilder()
                        .setCustomId('prevPage')
                        .setLabel("".concat(this.page))
                        .setStyle(ButtonStyle.Secondary));
                components.push(new ButtonBuilder()
                    .setCustomId('currentPage')
                    .setLabel("".concat(this.page + 1))
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true));
                if (this.page < maxPages)
                    components.push(new ButtonBuilder()
                        .setCustomId('nextPage')
                        .setLabel("".concat(this.page + 2))
                        .setStyle(ButtonStyle.Secondary));
                row.addComponents(components);
                channel = this.message.channel;
                collector = channel.createMessageComponentCollector({});
                collector.on('collect', function (i) { return __awaiter(_this, void 0, void 0, function () {
                    var error_1, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(i.customId == "checker")) return [3 /*break*/, 6];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, i.update({ components: [], content: "---" })];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                console.log("ERROR");
                                return [3 /*break*/, 4];
                            case 4: return [4 /*yield*/, this.manager.chooseWindow("checker")];
                            case 5:
                                _a.sent();
                                collector.removeAllListeners();
                                _a.label = 6;
                            case 6:
                                if (!(i.customId == "description")) return [3 /*break*/, 12];
                                _a.label = 7;
                            case 7:
                                _a.trys.push([7, 9, , 10]);
                                return [4 /*yield*/, i.update({ components: [], content: "---" })];
                            case 8:
                                _a.sent();
                                return [3 /*break*/, 10];
                            case 9:
                                error_2 = _a.sent();
                                console.log("ERROR");
                                return [3 /*break*/, 10];
                            case 10: return [4 /*yield*/, this.manager.chooseWindow("description")];
                            case 11:
                                _a.sent();
                                collector.removeAllListeners();
                                _a.label = 12;
                            case 12:
                                if (!(i.customId.split("_")[0] == "prevPage")) return [3 /*break*/, 14];
                                this.page -= 1;
                                return [4 /*yield*/, i.update({ components: [], content: "---" })];
                            case 13:
                                _a.sent();
                                this.refresh();
                                collector.removeAllListeners();
                                _a.label = 14;
                            case 14:
                                if (!(i.customId.split("_")[0] == "nextPage")) return [3 /*break*/, 16];
                                this.page += 1;
                                return [4 /*yield*/, i.update({ components: [], content: "---" })];
                            case 15:
                                _a.sent();
                                this.refresh();
                                collector.removeAllListeners();
                                _a.label = 16;
                            case 16: return [2 /*return*/];
                        }
                    });
                }); });
                collector.on('end', function (collected) { return console.log("Collected ".concat(collected.size, " items")); });
                this.message.edit({ embeds: [embed], components: [row] });
                return [2 /*return*/];
            });
        });
    };
    return MusicPlaylist;
}());
exports.default = MusicPlaylist;
