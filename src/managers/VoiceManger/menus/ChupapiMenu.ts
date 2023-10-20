import { EmbedBuilder } from "discord.js";

class ChupapiMenu {
    embed: EmbedBuilder;

    constructor () {
        this.embed = new EmbedBuilder().setDescription("Chupapi menu:");
    }
}

export default ChupapiMenu;