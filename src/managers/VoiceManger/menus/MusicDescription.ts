import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, TextChannel } from "discord.js";
import VoiceManager from "../VoiceManager";
import PauseButton from "./Buttons/PauseButton";
import NextButton from "./Buttons/NextButton";
import DescriptionButton from "./Buttons/DescriptionButton";
import TurnButton from "./Buttons/TurnButton";
import CheckerButton from "./Buttons/CheckerButton";
import PreserveButton from "./Buttons/PreserveButton";


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
            .setColor(0x0099FF)
            .setAuthor({ name: track.includingUser.username, iconURL: track.includingUser.avatarURL() })



            const buttons = [
                new PreserveButton(this.manager),
                new PauseButton(this.manager),
                new NextButton(this.manager),
                new TurnButton(this.manager),
                new CheckerButton(this.manager)
            ];
            
            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(                    
                    ...buttons.map(button => button.buildButton())
                );
    
    
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
                // await i.update({ content: 'A button was clicked!', components: [] });
            });
        
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            
        this.message.edit({ embeds: [embed], components: [row] });
    }
}

export default MusicDescription;