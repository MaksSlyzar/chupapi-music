import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, TextChannel } from "discord.js";
import VoiceManager from "../VoiceManager";

class MusicDescription {
    manager: VoiceManager;
    message: Message;

    constructor (manager: VoiceManager, message: Message) {
        this.manager = manager;
        this.message = message;
    }

    async refresh () {
        const track = this.manager.musicDatas.getTrack();

        if (!track)
            return; // None track
        
        const { title, description, likes, link, views } = track;

        const embed = new EmbedBuilder()
                                        .setTitle(`${title}`)
                                        .setDescription(`Link: ${link}
                                                         Likes: **${likes}**
                                                         Views: **${views}**
                                                         Platform: **${track.platform}**
                                                         BotListened: 
                                                         Most included: 
                                                         `)
                                        .setAuthor({ name: track.includingUser.username, iconURL: track.includingUser.avatarURL() })

        

        const row = new ActionRowBuilder() as any;

        const components = [
            new ButtonBuilder()
                .setCustomId('checker')
                .setLabel('Checker')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('turn')
                .setLabel('Turn')
                .setStyle(ButtonStyle.Secondary),
        ];

        row.addComponents(components);

        const channel = this.message.channel as TextChannel;
        const collector = channel.createMessageComponentCollector({ });
        
        collector.on('collect', async i => {
            if (i.customId == "turn") {
                this.manager.tabsRefreshing++;

                try {
                    await i.update({ content: `---.`, embeds: [
                        new EmbedBuilder().setDescription("wait...")
                    ] });
                } catch (error) {
                    console.log("ERROR")
                }


                await this.manager.chooseWindow("playlist");
                
                collector.removeAllListeners();
            }

            if (i.customId == "checker") {
                this.manager.tabsRefreshing++;
                
                try {
                    await i.update({ content: `---`, embeds: [
                        new EmbedBuilder().setDescription("wait...")
                    ] });
                } catch (error) {
                    console.log("ERROR")
                }

                await this.manager.chooseWindow("checker");

                collector.removeAllListeners();
            }
            // await i.update({ content: 'A button was clicked!', components: [] });
        });
        
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            
        this.message.edit({ embeds: [embed], components: [row] });
    }
}

export default MusicDescription;