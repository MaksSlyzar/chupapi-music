"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SpawnerManager_1 = __importDefault(require("./SpawnerManager"));
var VoiceManager_1 = __importDefault(require("./VoiceManger/VoiceManager"));
var GuildManager = /** @class */ (function () {
    function GuildManager(guild) {
        this.guild = guild;
        this.spawnerManager = new SpawnerManager_1.default(guild);
        this.voiceManager = new VoiceManager_1.default(guild);
    }
    return GuildManager;
}());
exports.default = GuildManager;
