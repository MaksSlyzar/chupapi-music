import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, TextChannel } from "discord.js";
import VoiceManager from "../VoiceManager";


function addSpacesToNumber(number: number): string {
    // Перетворюємо число в рядок
    const numStr: string = number.toString();

    // Розділяємо рядок на групи по три цифри з кінця
    const parts: string[] = [];
    let tempPart: string = "";
    let count: number = 0;

    for (let i = numStr.length - 1; i >= 0; i--) {
        tempPart = numStr[i] + tempPart;
        count++;

        if (count === 3) {
            parts.unshift(tempPart);
            tempPart = "";
            count = 0;
        }
    }

    if (tempPart.length > 0) {
        parts.unshift(tempPart);
    }

    // З'єднуємо групи з пробілами та повертаємо результат
    const result: string = parts.join(" ");
    return result;
}

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
                                                         Likes: **${addSpacesToNumber(likes)}**:thumbsup: 
                                                         Views: **${addSpacesToNumber(views)}**:eyeglasses:
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