import { Guild } from "discord.js";

function getEmojie (guild: Guild, emojieId: string) {
    return guild.emojis.cache.find((emojie) => emojie.id == emojieId);
}

export default getEmojie;