import { AwaitReactionsOptions, Embed, EmbedBuilder, Message, MessageActionRowComponent, MessageReaction, ReactionCollector, ReactionEmoji, TextChannel, User } from "discord.js";
import PlayerSchema from "../../schemas/UserSchema";
import CompassModule from "./CompassModule";

class Quests extends CompassModule {
    constructor (user: User, channel: TextChannel, history: Array<CompassModule>, index: number, message?: Message) {
        super(user, channel, history, index, message);

        console.log(history, "history")


        if (index > history.length)
            history.push(this);
        
        if (!message)
            channel.send("Generating message, wait please:)").then(message => {
                this.message = message;
                this.generateMessage();
            });
        else
            this.generateMessage();
    }

    embedMessage (id: number) {
        if (id == 0) {
            return new EmbedBuilder()
                                .setTitle(`Quests`)
                                .setDescription(`I can't find your player account(\nPlease try to create new player!`)
                                // .setAuthor({ name: `${this.user.username}#${this.user.discriminator}`})
                                .setColor("#2F3136");
        }

        return new EmbedBuilder()
                                .setTitle(`Quests <${id}>`)
                                .setDescription(`1. None;
                                                 2. None;`)
                                // .setAuthor({ name: `${this.user.username}#${this.user.discriminator}`})
                                .setColor("#2F3136");
    }

    async generateMessage () {
        const playerData = await PlayerSchema.findOne({ 'userId': this.user.id });

        let playerId;
        
        if (playerData == null) 
            playerId = 0;
        else
            playerId = playerData.userId;

        const embed = this.embedMessage(playerId);
        
        // await this.message.edit("_");
        await this.message.edit({embeds: [embed], content: ""});


        const emojies = ["⬅️"]
        emojies.map(async emoji => { await this.message.react(emoji) });
        
        this.setupCollector();

        // this.message.awaitReactions({ filter: () => false, max: 10, errors: ["time"], time: 10000 }).then(collected => {
        //     console.log(collected)
        //     this.channel.send("sadads")
        // }).catch(error => console.log(error));
    }

    setupCollector () {
        const filter = (reaction: MessageReaction, user: User) => {
            return ["⬅️", "🏹"].includes(reaction.emoji.name) && user.id === this.user.id;
        };

        const collector = this.message.createReactionCollector({ filter: filter, time: 15000 });

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
                case "⬅️":
                    this.backHistory();
                    this.message.reactions.removeAll();
                break;
            }
        });

        collector.on("end", async (reason: string) => {
            this.removeMessage();
            
            collector.removeAllListeners();
        });
    }
}

export default Quests;