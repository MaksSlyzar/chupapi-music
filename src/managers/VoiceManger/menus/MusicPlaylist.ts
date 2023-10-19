import { EmbedBuilder, Message, TextChannel } from "discord.js";
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
import VoiceManager from "../VoiceManager";

class MusicPlaylist {
    manager: VoiceManager;
    message: Message;
    page: number;

    constructor (manager: VoiceManager, message: Message) {
        this.manager = manager;
        this.message = message;
        this.page = 0;
    }

    async refresh () {
        // return;
        // console.log("REFRESH")

        // console.log(this.manager.musicDatas.getDiapTracks(this.page * 10, this.page * 10 + 10));
        // return;
        const embed = new EmbedBuilder()
                                        .setTitle("Turn!")
                                        .setDescription(`${this.manager.musicDatas.getDiapTracks(this.page * 10, this.page * 10 + 10).map((track, index) => {
                                            return `${index === this.manager.musicDatas.index? 
                                                this.manager.state.play?"▶️":"⏸️"
                                            : ""}" ${track.title}" added by **${track.includingUser.username}**\n`
                                        }).join('\n')}`);


        const row = new ActionRowBuilder();

        const maxPages = Math.floor(this.manager.musicDatas.musicList.length / 10);
        // console.log(maxPages, "Max pages");

        const components = [
                new ButtonBuilder()
                    .setCustomId('checker')
                    .setLabel('Checker')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('description')
                    .setLabel('Description')
                    .setStyle(ButtonStyle.Secondary),      
        ];
        
        
        if (this.page != 0)
            components.push(new ButtonBuilder()
                .setCustomId('prevPage')
                .setLabel(`${this.page}`)
                .setStyle(ButtonStyle.Secondary))
        
        components.push(new ButtonBuilder()
            .setCustomId('currentPage')
            .setLabel(`${this.page + 1}`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true))

        if (this.page < maxPages)
            components.push(new ButtonBuilder()
                .setCustomId('nextPage')
                .setLabel(`${this.page + 2}`)
                .setStyle(ButtonStyle.Secondary))
            
        row.addComponents(components);

        // const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';
                
        const channel = this.message.channel as TextChannel;
        const collector = channel.createMessageComponentCollector({ });
        
        collector.on('collect', async i => {
            if (i.customId == "checker") {
                try {
                    await i.update({ components: [], content: "---" })
                } catch (error) {
                    console.log("ERROR");
                }
                
                await this.manager.chooseWindow("checker");

                collector.removeAllListeners();
            }

            if (i.customId == "next") {
                try {
                    await i.update({ content: `---`, embeds: [
                        new EmbedBuilder().setDescription("wait...")
                    ] });
                } catch (error) {
                    console.log("ERROR")
                }

                this.manager.skip();
            }

            if (i.customId == "description") {
                try {
                    await i.update({ components: [], content: "---" })
                } catch (error) {
                    console.log("ERROR");
                }
                
                await this.manager.chooseWindow("description");
                
                collector.removeAllListeners();
            } 

            if (i.customId.split("_")[0] == "prevPage") {
                this.page -= 1;
                await i.update({ components: [], content: "---" });
                this.refresh();

                collector.removeAllListeners();
            }

            if (i.customId.split("_")[0] == "nextPage") {
                this.page += 1;
                await i.update({ components: [], content: "---" });
                this.refresh();
                
                collector.removeAllListeners();
            }
            // await i.update({ content: 'A button was clicked!', components: [] });
        });
        
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            

        this.message.edit({ embeds: [embed], components: [row] });
    }
}

export default MusicPlaylist;