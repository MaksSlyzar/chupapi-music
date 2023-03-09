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
var voice_1 = require("@discordjs/voice");
var play_dl_1 = __importDefault(require("play-dl"));
var MusicChecker_1 = __importDefault(require("./menus/MusicChecker"));
var MusicDescription_1 = __importDefault(require("./menus/MusicDescription"));
var MusicPlaylist_1 = __importDefault(require("./menus/MusicPlaylist"));
var MusicDatas_1 = __importDefault(require("./MusicDatas"));
var UserSchema_1 = __importDefault(require("../../schemas/UserSchema"));
var SoundSchema_1 = __importDefault(require("../../schemas/SoundSchema"));
var VoiceManager = /** @class */ (function () {
    function VoiceManager(guild) {
        this.tabsRefreshing = 0;
        this.hearTime = 0;
        this.hearStartTime = 0;
        this.guild = guild;
        this.work = false;
        this.musicDatas = new MusicDatas_1.default();
        this.state = {
            play: false
        };
    }
    VoiceManager.prototype.chooseWindow = function (window) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nowWindow = window;
                        if (!(this.nowWindow == "checker")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.musicChecker.refresh(this.musicDatas.getTrack())];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(this.nowWindow == "playlist")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.musicPlaylist.refresh()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(this.nowWindow == "description")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.musicDescription.refresh()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VoiceManager.prototype.addTrack = function (includingUser, member, trackStr) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.musicDatas.addTrack(trackStr, includingUser)];
                    case 1:
                        _d.sent();
                        if (!(this.work == false)) return [3 /*break*/, 4];
                        _a = this;
                        return [4 /*yield*/, this.textChannel.send("Wait pls:)")];
                    case 2:
                        _a.message = _d.sent();
                        this.musicChecker = new MusicChecker_1.default(this, this.message);
                        this.nowWindow = "checker";
                        this.musicPlaylist = new MusicPlaylist_1.default(this, this.message);
                        this.musicDescription = new MusicDescription_1.default(this, this.message);
                        connection = (0, voice_1.joinVoiceChannel)({
                            channelId: member.voice.channelId,
                            guildId: this.message.guildId,
                            debug: true,
                            adapterCreator: this.message.guild.voiceAdapterCreator
                        });
                        connection.on("debug", function (debugMessage) {
                            // console.log("Voice debug: ", debugMessage);
                        });
                        this.audioPlayer = (0, voice_1.createAudioPlayer)();
                        connection.subscribe(this.audioPlayer);
                        this.connection = connection;
                        connection.on("stateChange", function (oldState, newState) {
                            // console.log("State Change")
                            // if (
                            //     oldState.status === VoiceConnectionStatus.Ready &&
                            //     newState.status === VoiceConnectionStatus.Connecting
                            // ) {
                            //     connection.configureNetworking();
                            // }
                            var oldNetworking = Reflect.get(oldState, 'networking');
                            var newNetworking = Reflect.get(newState, 'networking');
                            var networkStateChangeHandler = function (oldNetworkState, newNetworkState) {
                                var newUdp = Reflect.get(newNetworkState, 'udp');
                                clearInterval(newUdp === null || newUdp === void 0 ? void 0 : newUdp.keepAliveInterval);
                            };
                            oldNetworking === null || oldNetworking === void 0 ? void 0 : oldNetworking.off('stateChange', networkStateChangeHandler);
                            newNetworking === null || newNetworking === void 0 ? void 0 : newNetworking.on('stateChange', networkStateChangeHandler);
                        });
                        this.audioPlayer.on(voice_1.AudioPlayerStatus.Playing, function (state) {
                            console.log("Playing");
                            _this.hearStartTime = Date.now();
                            _this.state.play = true;
                            _this.startUsersInChannel = [];
                            member.voice.channel.members.map(function (user) {
                                _this.startUsersInChannel.push(user.id);
                            });
                            _this.addTrackIntoDb();
                            //remove this pls
                            // console.log(state)
                        });
                        this.audioPlayer.on(voice_1.AudioPlayerStatus.Idle, function () {
                            console.log("Idle");
                            // const users: Array<string> = [];
                            // // this.voiceChannel.members.map(user => {
                            // //     if (user.id in this.startUsersInChannel) {
                            // //         users.push(user.id);
                            // //     }
                            // // });
                            // this.addHoursIntoDb(users);
                            _this.hearTime += Date.now() - _this.hearStartTime;
                            if (_this.hearTime > 25000) {
                                // this.addTrackIntoDb();
                            }
                            console.log("HEAR TIME!!!", _this.hearTime / 1000);
                            if (!_this.musicDatas.getTrack()) {
                                console.log("Return");
                                _this.work = false;
                                _this.musicDatas.musicList = [];
                                _this.musicDatas.index = 0;
                                _this.state.play = false;
                                return;
                            }
                            _this.state.play = false;
                            _this.musicDatas.index++;
                            if (_this.nowWindow == "checker")
                                _this.musicChecker.refresh(_this.musicDatas.getTrack());
                            if (_this.nowWindow == "playlist")
                                _this.musicPlaylist.refresh();
                            _this.playStream();
                        });
                        this.audioPlayer.on(voice_1.AudioPlayerStatus.AutoPaused, function (state) {
                            console.log("Autopaused, status:");
                        });
                        this.audioPlayer.on(voice_1.AudioPlayerStatus.Paused, function () {
                            console.log("Paused");
                        });
                        this.audioPlayer.on(voice_1.AudioPlayerStatus.Buffering, function () {
                            console.log("Buffering");
                        });
                        this.audioPlayer.on("error", function () {
                            console.log("Error");
                        });
                        // console.log(this.musicDatas)
                        this.playStream();
                        //
                        // const music = new MusicDto("Ichi ni san pyro", includingUser);
                        // this.musicChpecker.refresh(music);
                        this.work = true;
                        _c = (_b = this.musicChecker).refresh;
                        return [4 /*yield*/, this.musicDatas.getTrack()];
                    case 3:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                    case 4:
                        if (this.nowWindow == "checker")
                            this.musicChecker.refresh(this.musicDatas.getTrack());
                        if (this.nowWindow == "playlist")
                            this.musicPlaylist.refresh();
                        return [2 /*return*/];
                }
            });
        });
    };
    VoiceManager.prototype.addHoursIntoDb = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VoiceManager.prototype.addTrackIntoDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var music, user, sound;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        music = this.musicDatas.getTrack();
                        return [4 /*yield*/, UserSchema_1.default.findOne({ userId: music.includingUser.id })];
                    case 1:
                        user = _a.sent();
                        if (!(user == null)) return [3 /*break*/, 3];
                        user = new UserSchema_1.default({ userId: music.includingUser.id, history: [] });
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        sound = new SoundSchema_1.default({ link: music.link, date: Date.now(), addedBy: user.id });
                        return [4 /*yield*/, sound.save()];
                    case 4:
                        _a.sent();
                        console.log(user, sound);
                        return [2 /*return*/];
                }
            });
        });
    };
    VoiceManager.prototype.playStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            var track, stream, resource, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        track = this.musicDatas.getTrack();
                        if (!track)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, play_dl_1.default.stream(this.musicDatas.getTrack().link, {
                                discordPlayerCompatibility: true,
                            })];
                    case 2:
                        stream = _a.sent();
                        resource = (0, voice_1.createAudioResource)(stream.stream, {
                            inputType: stream.type,
                        });
                        // console.log(resource.playbackDuration);
                        // const read = resource.read();
                        // console.log(read)
                        // resource.playbackDuration = track.time * 1000;
                        // console.log(resource.ended);
                        // console.log(resource);
                        // resource.
                        this.audioPlayer.play(resource);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VoiceManager.prototype.pause = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VoiceManager.prototype.unpause = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VoiceManager.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VoiceManager.prototype.skip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.audioPlayer.stop();
                return [2 /*return*/];
            });
        });
    };
    VoiceManager.prototype.prev = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VoiceManager.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    VoiceManager.prototype.setTextChannel = function (channel) {
        this.textChannel = channel;
    };
    return VoiceManager;
}());
exports.default = VoiceManager;
