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
var play_dl_1 = __importDefault(require("play-dl"));
var MusicDto_1 = __importDefault(require("../../dtos/MusicDto"));
var MusicDatas = /** @class */ (function () {
    function MusicDatas() {
        this.musicList = [];
        this.index = 0;
    }
    MusicDatas.prototype.addTrack = function (input, user) {
        return __awaiter(this, void 0, void 0, function () {
            var validate, track, music, playlist_1, allTracks, error_1, track, music, playlist, minAllVideos, i, videoMin, track, music;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, play_dl_1.default.validate(input)];
                    case 1:
                        validate = _a.sent();
                        if (!(validate == "sp_track")) return [3 /*break*/, 3];
                        return [4 /*yield*/, play_dl_1.default.spotify(input)];
                    case 2:
                        track = _a.sent();
                        music = new MusicDto_1.default(track.name, user, "", track.url);
                        music.platform = "spotify";
                        music.imageURL = track.thumbnail.url;
                        music.link = track.url;
                        this.musicList.push(music);
                        return [3 /*break*/, 19];
                    case 3:
                        if (!(validate == "sp_playlist")) return [3 /*break*/, 9];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, play_dl_1.default.spotify(input)];
                    case 5:
                        playlist_1 = _a.sent();
                        return [4 /*yield*/, playlist_1.all_tracks()];
                    case 6:
                        allTracks = _a.sent();
                        // console.log(allTracks);
                        allTracks.map((function (track) {
                            var music = new MusicDto_1.default(track.name, user, "", track.url);
                            music.owner = playlist_1.owner.name;
                            // music.ownerIcon = playlist.owner.url;
                            music.imageURL = track.thumbnail.url;
                            music.platform = "spotify";
                            music.time = track.durationInSec;
                            music.link = track.url;
                            _this.musicList.push(music);
                        }));
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 19];
                    case 9:
                        if (!(validate == "yt_video")) return [3 /*break*/, 12];
                        return [4 /*yield*/, play_dl_1.default.video_basic_info(input)];
                    case 10: return [4 /*yield*/, (_a.sent()).video_details];
                    case 11:
                        track = _a.sent();
                        music = new MusicDto_1.default(track.title, user, "", track.url);
                        music.likes = track.likes;
                        music.views = track.views;
                        music.time = track.durationInSec;
                        music.owner = track.channel.name;
                        music.platform = "youtube";
                        music.imageURL = track.thumbnails[0].url;
                        music.link = track.url;
                        this.musicList.push(music);
                        return [3 /*break*/, 19];
                    case 12:
                        if (!(validate == "yt_playlist")) return [3 /*break*/, 19];
                        return [4 /*yield*/, play_dl_1.default.playlist_info(input)];
                    case 13:
                        playlist = _a.sent();
                        return [4 /*yield*/, playlist.all_videos()];
                    case 14:
                        minAllVideos = _a.sent();
                        i = 0;
                        _a.label = 15;
                    case 15:
                        if (!(i < minAllVideos.length)) return [3 /*break*/, 19];
                        videoMin = minAllVideos[i];
                        return [4 /*yield*/, play_dl_1.default.video_basic_info(videoMin.url)];
                    case 16: return [4 /*yield*/, (_a.sent()).video_details];
                    case 17:
                        track = _a.sent();
                        music = new MusicDto_1.default(track.title, user, "", track.url);
                        music.time = track.durationInSec;
                        music.owner = track.channel.name;
                        music.platform = "youtube";
                        music.imageURL = track.thumbnails[0].url;
                        music.link = track.url;
                        this.musicList.push(music);
                        _a.label = 18;
                    case 18:
                        i++;
                        return [3 /*break*/, 15];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    MusicDatas.prototype.getTrack = function () {
        return this.musicList[this.index];
    };
    MusicDatas.prototype.getDiapTracks = function (from, to) {
        var tracks = [];
        for (var i = from; i < to; i++)
            if (this.musicList.length <= i)
                return tracks;
            else
                tracks.push(this.musicList[i]);
        return tracks;
    };
    return MusicDatas;
}());
exports.default = MusicDatas;
