import { EmbedBuilder, Message, TextChannel } from "discord.js";
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
import VoiceManager from "../VoiceManager";
import CheckerButton from "./Buttons/CheckerButton";
import DescriptionButton from "./Buttons/DescriptionButton";


import { pauseEmoji, checkerEmoji } from "../../../constants/emojies_music.json";

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
                                        .setTitle("Turn")
                                        .setDescription(`${this.manager.musicDatas.getDiapTracks(this.page * 10, this.page * 10 + 10).map((track, index) => {
                                            return `${index + this.page * 10 === this.manager.musicDatas.index? 
                                                this.manager.paused?pauseEmoji:checkerEmoji
                                            : ""}"  ${track.title}" added by **${track.includingUser.username}**\n`
                                        }).join('\n')}`)
                                        .setColor(0x0099FF);


        const row = new ActionRowBuilder();

        const maxPages = Math.floor(this.manager.musicDatas.musicList.length / 10);
        // console.log(maxPages, "Max pages");

        const buttons = [
            new CheckerButton(this.manager),
            new DescriptionButton(this.manager)
        ]

        const components = [  
            
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
            
        components.push(...buttons.map(button => button.buildButton()));
        row.addComponents(components);

        // const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';
                
        const channel = this.message.channel as TextChannel;
        const collector = channel.createMessageComponentCollector({ });
        
        collector.on('collect', async i => {
            const selectedCustomId = i.customId;
    
            for (const chupapiButton of buttons) {
                if (selectedCustomId == chupapiButton.customId) {
                    chupapiButton.pressed(i, collector);
                }
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