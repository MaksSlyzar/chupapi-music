import { ActionRow,  ActionRowBuilder, Embed, EmbedBuilder, Message, TextChannel, ButtonBuilder, ButtonStyle, Events, ButtonInteraction } from "discord.js";
import MusicDto from "../../../dtos/MusicDto";
const wait = require('node:timers/promises').setTimeout;
import VoiceManager from "../VoiceManager";

import parseSeconds from "../../../modules/parseSeconds";
import DescriptionButton from "./Buttons/DescriptionButton";
import TurnButton from "./Buttons/TurnButton";
import PauseButton from "./Buttons/PauseButton";
import NextButton from "./Buttons/NextButton";
import PreserveButton from "./Buttons/PreserveButton";

import { likeEmoji, dislikeEmoji} from "../../../constants/emojies_music.json";
import Progress from "./Progress/ProgressSound";
import ChupapiMenu from "./ChupapiMenu";

class MusicChecker extends ChupapiMenu {
    message: Message;
    manager: VoiceManager;
    updateProgressSound = true;

    constructor (voiceManager: VoiceManager, message: Message) {
        super();
        this.manager = voiceManager;
        this.message = message;

        this.message.react(likeEmoji);
        this.message.react(dislikeEmoji);
    }

    refresh (music: MusicDto) {
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

        
        this.embed = new EmbedBuilder()
                                        .setTitle(music.title)
                                        .setURL(music.link)
                                        .setColor(0x0099FF)
                                        .setDescription(`
                                                        Time **${parseSeconds(music.time)}**
                                                        Owner **${music.owner}**
                                                        ${nextTrack?`Next track **${nextTrack.title}** time ${parseSeconds(nextTrack.time)}`:''}
                                                        ${this.manager.progress.getProgress()}`)
                                        // .setThumbnail(music.imageURL)
                                        .setThumbnail("https://pract.zanpy.repl.co/wowk.gif")
                                        .setFooter({ text: `Included by ${music.includingUser.username}`,
                                                     iconURL: music.includingUser.avatarURL() });

        
        this.manager.nowWindow = "checker";
        

        const buttons = [
            new PreserveButton(this.manager),
            new PauseButton(this.manager),
            new NextButton(this.manager),
            new DescriptionButton(this.manager),
            new TurnButton(this.manager),
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

        this.message.edit({ embeds: [this.embed], components: [row] }).then(() => {
            // this.manager.newUpdateProgress = true;
            // this.manager.progress.update();
        });
    }
}

export default MusicChecker;