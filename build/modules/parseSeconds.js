"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseSeconds(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    return "".concat(hours != 0 ? "".concat(hours, ":") : '').concat(minutes, ":").concat(remainingSeconds < 10 ? '0' : '').concat(remainingSeconds);
}
exports.default = parseSeconds;
