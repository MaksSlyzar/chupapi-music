"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEmojie(guild, emojieId) {
    return guild.emojis.cache.find(function (emojie) { return emojie.id == emojieId; });
}
exports.default = getEmojie;
