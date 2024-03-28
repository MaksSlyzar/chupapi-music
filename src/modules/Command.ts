import { Interaction, SlashCommandBuilder } from "discord.js";
import GuildManager from "../managers/GuildManager";

export default class Command {
    data: SlashCommandBuilder;

    async execute (interaction: Interaction, guildManager: GuildManager) {
        if (!interaction.isCommand())
            return;
    }
}