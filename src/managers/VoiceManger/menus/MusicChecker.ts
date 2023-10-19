import { Embed, EmbedBuilder, Message, TextChannel } from "discord.js";
import MusicDto from "../../../dtos/MusicDto";
const wait = require('node:timers/promises').setTimeout;
import VoiceManager from "../VoiceManager";

import parseSeconds from "../../../modules/parseSeconds";

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

class MusicChecker {
    message: Message;
    manager: VoiceManager;

    constructor (voiceManager: VoiceManager, message: Message) {
        this.manager = voiceManager;
        this.message = message;
    }

    refresh (music: MusicDto) {
        console.log("CHECKER")
        // console.log(music.includingUser)
        // return;

        if (!music) {
            const embed = new EmbedBuilder()
                                        .setTitle("Checker")
                                        .setDescription("Can't find the sound");

            return this.message.edit({ embeds: [embed] });
        }

        // console.log(music)

        let nextTrack;

        if (this.manager.musicDatas.musicList.length>this.manager.musicDatas.index) {
            nextTrack = this.manager.musicDatas.musicList[this.manager.musicDatas.index + 1];
        } else {
            nextTrack = null;
        }

        
        const embed = new EmbedBuilder()
                                        .setTitle(music.title)
                                        .setURL(music.link)
                                        .setColor(0x0099FF)
                                        .setDescription(`
                                                        Time **${parseSeconds(music.time)}**
                                                        Owner **${music.owner}**
                                                        ${nextTrack?`Next track **${nextTrack.title}** time ${parseSeconds(nextTrack.time)}`:''}`)
                                        .setThumbnail(music.imageURL)
                                        .setFooter({ text: `Included by ${music.includingUser.username}`,
                                                     iconURL: music.includingUser.avatarURL() });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("preserve")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("◀️"),
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸️'),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setEmoji('▶️')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('turn')
                    .setLabel('Turn')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('description')
                    .setLabel('Description')
                    .setStyle(ButtonStyle.Secondary),
            );

        // const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';

        const channel = this.message.channel as TextChannel;
        const collector = channel.createMessageComponentCollector({ });
        
        collector.on('collect', async i => {
            if (i.customId == "turn") {
                this.manager.tabsRefreshing++;

                try {
                    await i.update({ content: `---`, embeds: [
                        new EmbedBuilder().setDescription("wait...")
                    ] });
                } catch (error) {
                    console.log("ERROR")
                }


                await this.manager.chooseWindow("playlist");
                
                collector.removeAllListeners();
            }

            if (i.customId == "preserve") {

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
                this.manager.tabsRefreshing++;
                
                try {
                    await i.update({ content: `---`, embeds: [
                        new EmbedBuilder().setDescription("wait...")
                    ] });
                } catch (error) {
                    console.log("ERROR")
                }

                await this.manager.chooseWindow("description");

                collector.removeAllListeners();
            }
            // await i.update({ content: 'A button was clicked!', components: [] });
        });
        
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            

        this.message.edit({ embeds: [embed], components: [row] });
    }
}

export default MusicChecker;