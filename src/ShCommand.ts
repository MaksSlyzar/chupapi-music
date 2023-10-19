import { Message, Client } from "discord.js";
import GuildManager from "./managers/GuildManager";

class CommandChupapi {
    name: string = "none";
    async execute (message: Message, client: Client, guildManager: GuildManager) {
        console.log(name, "execute function not defined");
    }

    constructor () {
        
    }

    setName(name: string): CommandChupapi {
        this.name = name;

        return this;
    }

    setExecute (_callback: (message: Message, client: Client, guildManager: GuildManager) => any): CommandChupapi {
        this.execute = _callback;

        return this;
    }
}

export default CommandChupapi;