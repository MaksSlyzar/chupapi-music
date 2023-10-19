

import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import VoiceManager from "../../VoiceManager";
import { ChupapiButton, InteractionType, IntractionCollectorType } from "./ChupapiButton";


import { pauseEmoji, checkerEmoji } from "../../../../constants/emojies_music.json";

class PauseButton extends ChupapiButton {
    customId = "id-pause";
    pause: boolean = false;
    button: ButtonBuilder;


    constructor (voiceManager: VoiceManager) {
        super(voiceManager);
    }

    buildButton(): ButtonBuilder {
        // this.button = new ButtonBuilder()
        // .setCustomId(this.customId)
        // .setEmoji(checkerEmoji)
        // .setStyle(ButtonStyle.Secondary)
        
        // return this.button

        return this.voiceManager.paused == true? new ButtonBuilder()
            .setCustomId(this.customId)
            .setEmoji(checkerEmoji)
            .setStyle(ButtonStyle.Secondary)
        : new ButtonBuilder()
            .setCustomId(this.customId)
            .setEmoji(pauseEmoji)
            .setStyle(ButtonStyle.Secondary)
    }

    async pressed(i: InteractionType, collector: IntractionCollectorType){
        try {
            await i.update({ content: "---" })
        } catch (error) {
            console.log("ERROR")
        }

        if (this.voiceManager.paused == false)
            this.voiceManager.pause();
        else
            this.voiceManager.unpause();

        collector.removeAllListeners("collect");
        await this.voiceManager.chooseWindow(this.voiceManager.nowWindow);
        
    }
}

export default PauseButton;