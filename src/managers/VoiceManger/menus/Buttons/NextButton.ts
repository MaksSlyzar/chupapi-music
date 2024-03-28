import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import VoiceManager from "../../VoiceManager";
import { ChupapiButton, InteractionType, IntractionCollectorType } from "./ChupapiButton";


import { nextEmoji } from "../../../../constants/emojies_music.json";

class NextButton extends ChupapiButton {
    customId = "id-next";

    constructor (voiceManager: VoiceManager) {
        super(voiceManager);
    }

    buildButton(): ButtonBuilder {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setEmoji(nextEmoji)
            .setStyle(ButtonStyle.Secondary);
    }

    async pressed(i: InteractionType, collector: IntractionCollectorType){
        // try {
        //     await i.update({ content: `---`, embeds: [
        //         new EmbedBuilder().setDescription("wait...")
        //     ] });
        // } catch (error) {
        //     console.log("ERROR")
        // }

        // this.voiceManager.skip();
    }
}

export default NextButton;