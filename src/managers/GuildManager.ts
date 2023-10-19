import { Guild } from "discord.js";
import SpawnerManager from "./SpawnerManager";
import VoiceManager from "./VoiceManger/VoiceManager";

class GuildManager {
    guild: Guild;
    spawnerManager: SpawnerManager;
    voiceManager: VoiceManager;

    constructor (guild: Guild) {
        this.guild = guild;
        this.spawnerManager = new SpawnerManager(guild);
        this.voiceManager = new VoiceManager(guild);
    }
}

export default GuildManager;