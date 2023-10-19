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
exports.client = void 0;
var config_1 = __importDefault(require("./config"));
var discord_js_1 = require("discord.js");
var GuildManager_1 = __importDefault(require("./managers/GuildManager"));
var mongoose_1 = __importDefault(require("mongoose"));
var db_1 = __importDefault(require("./db"));
var UserSchema_1 = __importDefault(require("./schemas/UserSchema"));
var SoundSchema_1 = __importDefault(require("./schemas/SoundSchema"));
exports.client = new discord_js_1.Client({ intents: ["Guilds",
        "GuildMessages",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates",
        "GuildMessageReactions",
        "DirectMessageReactions",
        "GuildPresences",
        "GuildEmojisAndStickers",
        "GuildIntegrations",
        "GuildMembers",
        "GuildScheduledEvents",
        "GuildWebhooks"], });
var guildManagers = [];
exports.client.once("ready", function () {
    console.log("Runned chupapi bot!");
    exports.client.guilds.cache.map(function (guild) {
        var guildManager = new GuildManager_1.default(guild);
        guildManagers.push(guildManager);
    });
});
exports.client.on("messageReactionAdd", function (reaction) {
    // console.log(reaction)
});
exports.client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var commandName, guildId, guildManager, _i, guildManagers_1, value, channel, content, _user, sounds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (message.author.bot == true)
                    return [2 /*return*/];
                console.log(message.author.id);
                // if (message.author.id == "541273011848871956")
                //     return
                // const compas = new CompasManager(message.author, message.channel as TextChannel, [], 0);
                // const mainGuild = client.guilds.cache.find(g => g.id == "762420182047260703")?.emojis;
                // const emojies = mainGuild?.cache.map(em => em)
                if (message.content[0] != ":")
                    return [2 /*return*/];
                commandName = message.content.split(" ")[0].slice(1);
                console.log(commandName);
                guildId = message.guildId;
                for (_i = 0, guildManagers_1 = guildManagers; _i < guildManagers_1.length; _i++) {
                    value = guildManagers_1[_i];
                    if (value.guild.id == guildId)
                        guildManager = value;
                }
                channel = message.channel;
                guildManager.voiceManager.setTextChannel(channel);
                console.log(message.author.avatarURL());
                if (commandName == "play") {
                    content = message.content.split(" ").map(function (val, ind) { return ind == 0 ? "" : val; }).join(" ");
                    guildManager.voiceManager.addTrack(message.author, message.member, content);
                    message.delete();
                }
                if (commandName == "skip") {
                    guildManager.voiceManager.skip();
                    message.delete();
                }
                if (commandName == "gitler") {
                    channel.send({ embeds: [new discord_js_1.EmbedBuilder().setImage("https://cdn.discordapp.com/attachments/590541937900257324/1109043616179036242/2Q.png")] });
                }
                if (commandName == "vhuj") {
                    channel.send({ embeds: [new discord_js_1.EmbedBuilder().setImage("http://memesmix.net/media/created/5u2x90.jpg")] });
                }
                if (commandName.toLowerCase() == "nani") {
                    channel.send({ embeds: [new discord_js_1.EmbedBuilder().setImage("https://cdn.discordapp.com/attachments/786023455337218079/1110164982374617139/petya.png")] });
                }
                if (commandName == "unpause")
                    guildManager.voiceManager.audioPlayer.unpause();
                if (!(commandName == "sounds")) return [3 /*break*/, 3];
                return [4 /*yield*/, UserSchema_1.default.findOne({ userId: message.author.id })];
            case 1:
                _user = _a.sent();
                if (!_user)
                    return [2 /*return*/];
                return [4 /*yield*/, SoundSchema_1.default.find({ addedBy: _user.id })];
            case 2:
                sounds = _a.sent();
                console.log(sounds);
                channel.send("" + sounds.length);
                _a.label = 3;
            case 3:
                if (commandName == "тронилидом") {
                    channel.send({ embeds: [
                            new discord_js_1.EmbedBuilder().setTitle(Math.floor(Math.random() * 10) >= 5 ? "Трон" : "Дом").setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDj4g0kB65YEJ4pjUIxe2AV3AzwBFc5cx7_xbt4CfTLrKz9I2l1mblvYQK6Yw_VsyKss&usqp=CAU")
                        ] });
                }
                if (commandName == "gay") {
                    channel.send({ embeds: [new discord_js_1.EmbedBuilder().setImage("https://cdn.discordapp.com/attachments/590541937900257324/1084437913242189914/IMG_20230312_132735.jpg")] });
                }
                if (commandName == "pidar") {
                    channel.send({ embeds: [new discord_js_1.EmbedBuilder().setImage("https://cdn.discordapp.com/attachments/590541937900257324/1088952021991833621/image.png")] });
                }
                // if (guildManager == undefined)
                //     return message.channel.send("This guild is not in my datebase. I am sorry:(");
                if (guildManager == undefined) {
                    channel.send("This guild is not in my datebase. I am sorry:(");
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); });
try {
    mongoose_1.default.connect(config_1.default.MONGO_URL).then(function (db) {
        console.log("Successfully connected.");
        (0, db_1.default)();
        exports.client.login(config_1.default.DISCORD_TOKEN);
    });
}
catch (error) {
    console.error("Don't have connection with db\n", error);
}
// console.log(config);
