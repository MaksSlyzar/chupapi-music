import { ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import VoiceManager from "../../VoiceManager";
import { ChupapiButton, InteractionType, IntractionCollectorType } from "./ChupapiButton";
import { playlistEmoji } from "../../../../constants/emojies_music.json";

class TurnButton extends ChupapiButton {
    customId = "id-turn";

    constructor (voiceManager: VoiceManager) {
        super(voiceManager);
    }

    buildButton(): ButtonBuilder {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setLabel('Turn')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(playlistEmoji)
    }

    async pressed(i: InteractionType, collector: IntractionCollectorType){
        this.voiceManager.tabsRefreshing++;

        try {
            await i.update({ content: `---`, embeds: [
                new EmbedBuilder().setDescription("wait...")
            ] });
        } catch (error) {
            console.log("ERROR")
        }


        await this.voiceManager.chooseWindow("playlist");
        
        collector.removeAllListeners();
    }
}

export default TurnButton;