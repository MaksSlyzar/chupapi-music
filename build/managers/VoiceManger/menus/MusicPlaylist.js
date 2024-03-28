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
var _a = require('discord.js'), ActionRowBuilder = _a.ActionRowBuilder, ButtonBuilder = _a.ButtonBuilder, ButtonStyle = _a.ButtonStyle, Events = _a.Events;
var CheckerButton_1 = __importDefault(require("./Buttons/CheckerButton"));
var DescriptionButton_1 = __importDefault(require("./Buttons/DescriptionButton"));
var emojies_music_json_1 = require("../../../constants/emojies_music.json");
var ChupapiMenu_1 = __importDefault(require("./ChupapiMenu"));
var MusicPlaylist = /** @class */ (function (_super) {
    __extends(MusicPlaylist, _super);
    function MusicPlaylist(manager, message) {
        var _this = _super.call(this) || this;
        _this.updateProgressSound = true;
        _this.manager = manager;
        _this.message = message;
        _this.page = 0;
        return _this;
    }
    MusicPlaylist.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var row, maxPages, buttons, components, channel, collector;
            var _this = this;
            return __generator(this, function (_a) {
                // return;
                // console.log("REFRESH")
                // console.log(this.manager.musicDatas.getDiapTracks(this.page * 10, this.page * 10 + 10));
                // return;
                this.embed = new discord_js_1.EmbedBuilder()
                    .setTitle("Turn")
                    .setDescription("".concat(this.manager.musicDatas.getDiapTracks(this.page * 10, this.page * 10 + 10).map(function (track, index) {
                    return "".concat(index + _this.page * 10 === _this.manager.musicDatas.index ?
                        _this.manager.paused ? emojies_music_json_1.pauseEmoji : emojies_music_json_1.checkerEmoji
                        : "", "\"  ").concat(track.title, "\" added by **").concat(track.includingUser.username, "**\n                    ");
                }).join('\n'), "\n").concat(this.manager.progress.getProgress()))
                    .setColor(0x0099FF);
                this.manager.nowWindow = "playlist";
                row = new ActionRowBuilder();
                maxPages = Math.floor(this.manager.musicDatas.musicList.length / 10);
                buttons = [
                    new CheckerButton_1.default(this.manager),
                    new DescriptionButton_1.default(this.manager)
                ];
                components = [];
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
                components.push.apply(components, buttons.map(function (button) { return button.buildButton(); }));
                row.addComponents(components);
                channel = this.message.channel;
                collector = channel.createMessageComponentCollector({});
                collector.on('collect', function (i) { return __awaiter(_this, void 0, void 0, function () {
                    var selectedCustomId, _i, buttons_1, chupapiButton;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                selectedCustomId = i.customId;
                                for (_i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                                    chupapiButton = buttons_1[_i];
                                    if (selectedCustomId == chupapiButton.customId) {
                                        chupapiButton.pressed(i, collector);
                                    }
                                }
                                if (!(i.customId.split("_")[0] == "prevPage")) return [3 /*break*/, 2];
                                this.page -= 1;
                                return [4 /*yield*/, i.update({ components: [], content: "---" })];
                            case 1:
                                _a.sent();
                                this.refresh();
                                collector.removeAllListeners();
                                _a.label = 2;
                            case 2:
                                if (!(i.customId.split("_")[0] == "nextPage")) return [3 /*break*/, 4];
                                this.page += 1;
                                return [4 /*yield*/, i.update({ components: [], content: "---" })];
                            case 3:
                                _a.sent();
                                this.refresh();
                                collector.removeAllListeners();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                collector.on('end', function (collected) { return console.log("Collected ".concat(collected.size, " items")); });
                this.message.edit({ embeds: [this.embed], components: [row] }).then(function () {
                    // this.manager.progress.update();
                });
                return [2 /*return*/];
            });
        });
    };
    return MusicPlaylist;
}(ChupapiMenu_1.default));
exports.default = MusicPlaylist;
