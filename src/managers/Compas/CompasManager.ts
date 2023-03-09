import { AwaitReactionsOptions, Embed, EmbedBuilder, Message, MessageActionRowComponent, MessageActivityType, MessageReaction, ReactionCollector, ReactionEmoji, TextChannel, User } from "discord.js";
import CompassModule from "./CompassModule";
import Collection from "./Collection";
import Profile from "./Profile";
import Quests from "./Quests";
import playerSchema from "../../schemas/UserSchema";

class CompassManager extends CompassModule {
    constructor (user: User, channel: TextChannel, history: Array<CompassModule>, index: number, message?: Message) {
        super(user, channel, history, index, message);


        if (history.length == 0)
            history.push(this);
        
        if (!message)
            channel.send("Generating message, wait please:)").then(message => {
                this.message = message;
                this.generateMessage();
            });
    }

    embedMessage () {
        return new EmbedBuilder()
                                .setTitle("Compass <🧭>")
                                .setDescription(`**(📙)** to **Collection**\n
                                                 **(👤)** to **Profile**\n
                                                 **(🎵)** to **Quests**\n
                                                 **(➕)** to **New player**`)
                                // .setAuthor({ name: `${this.user.username}#${this.user.discriminator}`})
                                .setColor("#2F3136");

    }

    async generateMessage () {
        const embed = this.embedMessage();
        
        // await this.message.edit("_");
        await this.message.edit({embeds: [embed], content: ""});


        const emojies = [];

        console.log(this.history.length - 1, this.index)

        if (this.history.length - 1 < this.index) 
            emojies.push("⬅️");

        emojies.push("📙", "👤", "🎵", "➕");

        emojies.map(async emoji => { await this.message.react(emoji) });
        
        this.setupCollector();

        // this.message.awaitReactions({ filter: () => false, max: 10, errors: ["time"], time: 10000 }).then(collected => {
        //     console.log(collected)
        //     this.channel.send("sadads")
        // }).catch(error => console.log(error));
    }

    async regenerateMessage () {
        this.message.edit({ embeds: [this.embedMessage()] })
    }

    setupCollector () {
        const filter = (reaction: MessageReaction, user: User) => {
            return ["⬅️", "📙", "👤", "🎵", "➕"].includes(reaction.emoji.name) && user.id === this.user.id;
        };

        const collector = this.message.createReactionCollector({ filter: filter, time: 15000 });

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
                case "📙":
                    this.pushHistory(new Collection(this.user, this.channel, this.history, this.index + 1, this.message));
                    this.message.reactions.removeAll();
                    collector.removeAllListeners();
                break;

                case "👤":
                    this.pushHistory(new Profile(this.user, this.channel, this.history, this.index + 1, this.message));
                    this.message.reactions.removeAll();
                    collector.removeAllListeners();
                break;

                case "🎵":
                    this.pushHistory(new Quests(this.user, this.channel, this.history, this.index + 1, this.message));
                    this.message.reactions.removeAll();
                    collector.removeAllListeners();
                break;

                case "➕":
                    const player = new playerSchema({
                        userId: this.user.id
                    });

                    player.save();
                break;

                case "⬅️":

                break;
            }
        });

        collector.on("end", async (reason: string) => {
            this.removeMessage();
            collector.removeAllListeners();
        });
    }
}

export default CompassManager;