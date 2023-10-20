"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emojies_music_json_1 = require("../../../../constants/emojies_music.json");
function replaceAll(input, search, replacement) {
    return input.replace(new RegExp(search, 'g'), replacement);
}
var ProgressSound = /** @class */ (function () {
    function ProgressSound(voiceManager) {
        this.voiceManager = voiceManager;
    }
    ProgressSound.prototype.update = function () {
        var musicTimeStep = Math.floor(this.voiceManager.musicDatas.getTrack().time / 10);
        var window = this.voiceManager.getWindow();
        var messageEmbed = window.embed;
        var activeSteps = Math.floor(this.voiceManager.musicPlayableTime / musicTimeStep);
        var mainDescription = messageEmbed.data.description;
        mainDescription = replaceAll(mainDescription, emojies_music_json_1.progressRightEmoji, "");
        mainDescription = replaceAll(mainDescription, emojies_music_json_1.progressCenterEmoji, "");
        mainDescription = replaceAll(mainDescription, emojies_music_json_1.progressLeftEmoji, "");
        mainDescription = replaceAll(mainDescription, emojies_music_json_1.progressCenterEmptyEmoji, "");
        mainDescription = replaceAll(mainDescription, emojies_music_json_1.progressRightBlackEmoji, "");
        mainDescription = replaceAll(mainDescription, emojies_music_json_1.progressRightEmpty, "");
        var progressString = "";
        for (var i = 0; i <= 10; i++) {
            if (i <= activeSteps) {
                if (i == 0)
                    progressString += emojies_music_json_1.progressLeftEmoji;
                else if (i == 10)
                    progressString += emojies_music_json_1.progressRightEmoji;
                else if (i == activeSteps)
                    progressString += emojies_music_json_1.progressRightBlackEmoji;
                else
                    progressString += emojies_music_json_1.progressCenterEmoji;
            }
            else {
                if (i == 10) {
                    progressString += emojies_music_json_1.progressRightEmpty;
                }
                else
                    progressString += emojies_music_json_1.progressCenterEmptyEmoji;
            }
        }
        // const newEmbed = { ...messageEmbed };
        messageEmbed.setDescription(mainDescription + progressString);
        this.voiceManager.message.edit({ embeds: [messageEmbed] });
        messageEmbed.setDescription(mainDescription);
    };
    ProgressSound.prototype.getProgress = function () {
        var musicTimeStep = Math.floor(this.voiceManager.musicDatas.getTrack().time / 10);
        var window = this.voiceManager.getWindow();
        var messageEmbed = window.embed;
        var activeSteps = Math.floor(this.voiceManager.musicPlayableTime / musicTimeStep);
        var mainDescription = messageEmbed.data.description;
        var progressString = "";
        for (var i = 0; i <= 10; i++) {
            if (i <= activeSteps) {
                if (i == 0)
                    progressString += emojies_music_json_1.progressLeftEmoji;
                else if (i == 10)
                    progressString += emojies_music_json_1.progressRightEmoji;
                else if (i == activeSteps)
                    progressString += emojies_music_json_1.progressRightBlackEmoji;
                else
                    progressString += emojies_music_json_1.progressCenterEmoji;
            }
            else {
                if (i == 10) {
                    progressString += emojies_music_json_1.progressRightEmpty;
                }
                else
                    progressString += emojies_music_json_1.progressCenterEmptyEmoji;
            }
        }
        return progressString;
    };
    ProgressSound.prototype.addProgressToEmbed = function () {
        var musicTimeStep = Math.floor(this.voiceManager.musicDatas.getTrack().time / 10);
        var window = this.voiceManager.getWindow();
        var messageEmbed = window.embed;
        var activeSteps = Math.floor(this.voiceManager.musicPlayableTime / musicTimeStep);
        var mainDescription = messageEmbed.data.description;
        var progressString = "";
        for (var i = 0; i <= 10; i++) {
            if (i <= activeSteps) {
                if (i == 0)
                    progressString += emojies_music_json_1.progressLeftEmoji;
                else if (i == 10)
                    progressString += emojies_music_json_1.progressRightEmoji;
                else if (i == activeSteps)
                    progressString += emojies_music_json_1.progressRightBlackEmoji;
                else
                    progressString += emojies_music_json_1.progressCenterEmoji;
            }
            else {
                if (i == 10) {
                    progressString += emojies_music_json_1.progressRightEmpty;
                }
                else
                    progressString += emojies_music_json_1.progressCenterEmptyEmoji;
            }
        }
        messageEmbed.setDescription(mainDescription + "\n" + progressString);
        this.voiceManager.message.edit({ embeds: [messageEmbed] });
        messageEmbed.setDescription(mainDescription);
        return progressString;
    };
    return ProgressSound;
}());
exports.default = ProgressSound;
