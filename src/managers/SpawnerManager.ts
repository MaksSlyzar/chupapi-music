import { Guild } from "discord.js";

class SpawnerManager {
    guild: Guild;

    constructor (guild: Guild) {
        this.guild = guild;
        this.createCategories();
    }

    load () {}

    createCategories () {
        // this.guild.channels.create({
        //     name: "hello",
        //     type: ChannelType.GuildCategory,
        // })
    }
}

export default SpawnerManager;