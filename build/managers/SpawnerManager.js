"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpawnerManager = /** @class */ (function () {
    function SpawnerManager(guild) {
        this.guild = guild;
        this.createCategories();
    }
    SpawnerManager.prototype.load = function () { };
    SpawnerManager.prototype.createCategories = function () {
        // this.guild.channels.create({
        //     name: "hello",
        //     type: ChannelType.GuildCategory,
        // })
    };
    return SpawnerManager;
}());
exports.default = SpawnerManager;
