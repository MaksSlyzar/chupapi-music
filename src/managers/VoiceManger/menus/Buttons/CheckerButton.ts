import { ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder } from "discord.js";
import { ChupapiButton, InteractionType, IntractionCollectorType } from "./ChupapiButton";
import VoiceManager from "../../VoiceManager";
import { checkerEmoji } from "../../../../constants/emojies_music.json";

class CheckerButton extends ChupapiButton {
    customId = "id-checker";
    
    constructor (voiceManager: VoiceManager) {
        super(voiceManager);
    }

    buildButton () {
        return new ButtonBuilder()
        .setCustomId(this.customId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Checker")
        .setEmoji(checkerEmoji)
    }

    async pressed (i: InteractionType, collector: IntractionCollectorType) {
        try {
            await i.update({ components: [], content: "---" })
        } catch (error) {
            console.log("ERROR");
        }
        
        await this.voiceManager.chooseWindow("checker");

        collector.removeAllListeners();
    }
}

export default CheckerButton;