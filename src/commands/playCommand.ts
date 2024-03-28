import { Interaction, SlashCommandBuilder } from "discord.js"
import Command from "../modules/Command"
import GuildManager from "../managers/GuildManager";

export default class PlayCommand extends Command {
    constructor () {
        super();
        const data = new SlashCommandBuilder()
            .setName("play")
            .setDescription("Грати музику, так як грають твого батька")
            .addStringOption(option => 
                option.setName("find-source")
                      .setDescription("Лінк, або назва відоса")) as SlashCommandBuilder;

        this.data = data;
    }

    async execute(interaction: Interaction, guildManager: GuildManager) {
        if (!interaction.isCommand())
            return;
    
        const value = interaction.options.get("find-source").value.toString();
        const member = await guildManager.guild.members.fetch({ user: interaction.user }); 
        console.log(member);

        guildManager.voiceManager.addTrack(interaction.user, member, value);

        interaction.followUp;
    }
}