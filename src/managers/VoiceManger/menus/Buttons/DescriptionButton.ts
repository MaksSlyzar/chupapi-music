import { ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder } from "discord.js";
import { ChupapiButton, InteractionType, IntractionCollectorType } from "./ChupapiButton";
import VoiceManager from "../../VoiceManager";


import { descriptionEmoji } from "../../../../constants/emojies_music.json";

class DescriptionButton extends ChupapiButton {
    customId = "id-description";
    
    constructor (voiceManager: VoiceManager) {
        super(voiceManager);
    }

    buildButton () {
        return new ButtonBuilder()
        .setCustomId(this.customId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Description")
        .setEmoji(descriptionEmoji)
    }

    async pressed (i: InteractionType, collector: IntractionCollectorType) {
        this.voiceManager.tabsRefreshing++;
                
        try {
            await i.update({ content: `---`, embeds: [
                new EmbedBuilder().setDescription("wait...")
            ] });
        } catch (error) {
            console.log("ERROR")
        }

        await this.voiceManager.chooseWindow("description");

        collector.removeAllListeners();
    }
}

export default DescriptionButton;