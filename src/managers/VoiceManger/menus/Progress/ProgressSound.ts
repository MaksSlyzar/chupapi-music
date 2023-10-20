import { Embed, EmbedBuilder, Message, messageLink } from "discord.js";
import { progressRightEmoji, progressCenterEmoji, progressLeftEmoji, progressCenterEmptyEmoji, progressRightBlackEmoji, progressRightEmpty } from "../../../../constants/emojies_music.json";
import VoiceManager from "../../VoiceManager";

function replaceAll(input: string, search: string, replacement: string): string {
    return input.replace(new RegExp(search, 'g'), replacement);
}  

class ProgressSound {
    voiceManager: VoiceManager;

    constructor (voiceManager: VoiceManager) {
        this.voiceManager = voiceManager;
    }    

    update () {
        const musicTimeStep = Math.floor(this.voiceManager.musicDatas.getTrack().time / 10);
        const window = this.voiceManager.getWindow();
        const messageEmbed = window.embed;
        const activeSteps = Math.floor(this.voiceManager.musicPlayableTime / musicTimeStep);
        let mainDescription = messageEmbed.data.description;

        mainDescription = replaceAll(mainDescription, progressRightEmoji, "");
        mainDescription = replaceAll(mainDescription, progressCenterEmoji, "");
        mainDescription = replaceAll(mainDescription, progressLeftEmoji, "");
        mainDescription = replaceAll(mainDescription, progressCenterEmptyEmoji, "");
        mainDescription = replaceAll(mainDescription, progressRightBlackEmoji, "");
        mainDescription = replaceAll(mainDescription, progressRightEmpty, "");

        let progressString = "";

        for (let i = 0; i <= 10; i++) {
            if (i <= activeSteps) {
                if (i == 0)
                    progressString += progressLeftEmoji;
                else if (i == 10) 
                    progressString += progressRightEmoji;
                else if (i == activeSteps)
                    progressString += progressRightBlackEmoji;
                else
                    progressString += progressCenterEmoji;
            } else {
                if (i == 10) {
                    progressString += progressRightEmpty;
                } else 
                    progressString += progressCenterEmptyEmoji;
            }
        }

        // const newEmbed = { ...messageEmbed };

        messageEmbed.setDescription(mainDescription + progressString);

        this.voiceManager.message.edit({ embeds: [messageEmbed] })

        messageEmbed.setDescription(mainDescription);
    }

    getProgress () {
        const musicTimeStep = Math.floor(this.voiceManager.musicDatas.getTrack().time / 10);
        const window = this.voiceManager.getWindow();
        const messageEmbed = window.embed;
        const activeSteps = Math.floor(this.voiceManager.musicPlayableTime / musicTimeStep);
        const mainDescription = messageEmbed.data.description;

        let progressString = "";

        for (let i = 0; i <= 10; i++) {
            if (i <= activeSteps) {
                if (i == 0)
                    progressString += progressLeftEmoji;
                else if (i == 10) 
                    progressString += progressRightEmoji;
                else if (i == activeSteps)
                    progressString += progressRightBlackEmoji;
                else
                    progressString += progressCenterEmoji;
            } else {
                if (i == 10) {
                    progressString += progressRightEmpty;
                } else 
                    progressString += progressCenterEmptyEmoji;
            }
        }

        return progressString;
    }

    addProgressToEmbed () {
        const musicTimeStep = Math.floor(this.voiceManager.musicDatas.getTrack().time / 10);
        const window = this.voiceManager.getWindow();
        const messageEmbed = window.embed;
        const activeSteps = Math.floor(this.voiceManager.musicPlayableTime / musicTimeStep);
        const mainDescription = messageEmbed.data.description;

        let progressString = "";

        for (let i = 0; i <= 10; i++) {
            if (i <= activeSteps) {
                if (i == 0)
                    progressString += progressLeftEmoji;
                else if (i == 10) 
                    progressString += progressRightEmoji;
                else if (i == activeSteps)
                    progressString += progressRightBlackEmoji;
                else
                    progressString += progressCenterEmoji;
            } else {
                if (i == 10) {
                    progressString += progressRightEmpty;
                } else 
                    progressString += progressCenterEmptyEmoji;
            }
        }

        messageEmbed.setDescription(mainDescription + "\n" + progressString);

        this.voiceManager.message.edit({ embeds: [messageEmbed] })

        messageEmbed.setDescription(mainDescription);
        return progressString;
    }
}

export default ProgressSound;