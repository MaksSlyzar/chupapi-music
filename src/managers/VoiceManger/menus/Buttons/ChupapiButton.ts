import { ButtonBuilder, ButtonInteraction, ButtonStyle, CacheType, ChannelSelectMenuInteraction, InteractionCollector, InteractionCollectorOptions, MentionableSelectMenuInteraction, RoleSelectMenuInteraction, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js";
import VoiceManager from "../../VoiceManager";

export type InteractionType = 
  ButtonInteraction<CacheType> | 
  StringSelectMenuInteraction<CacheType> | 
  UserSelectMenuInteraction<CacheType> | 
  RoleSelectMenuInteraction<any> | 
  MentionableSelectMenuInteraction<any> | 
  ChannelSelectMenuInteraction<any>;

export type IntractionCollectorType =
    InteractionCollector<StringSelectMenuInteraction<CacheType> | UserSelectMenuInteraction<CacheType> | RoleSelectMenuInteraction<CacheType> | MentionableSelectMenuInteraction<any> | ChannelSelectMenuInteraction<any> | ButtonInteraction<any>>

export class ChupapiButton {
    customId: string;
    voiceManager: VoiceManager;

    constructor (voiceManager: VoiceManager) {
        this.voiceManager = voiceManager;
    }

    buildButton (): ButtonBuilder {
        return new ButtonBuilder()
        .setCustomId(this.customId)
        .setStyle(ButtonStyle.Secondary)
        .setLabel("Chupapi") 
    }

    async pressed (i: InteractionType, collector: IntractionCollectorType) {
    }
}
