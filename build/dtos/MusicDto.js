"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MusicDto = /** @class */ (function () {
    function MusicDto(title, includingUser, description, url) {
        title = title.replace("||", " ");
        this.title = title;
        this.includingUser = includingUser;
    }
    return MusicDto;
}());
exports.default = MusicDto;
