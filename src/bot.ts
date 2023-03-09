import config from "./config"
import { Client, EmbedBuilder, Message, TextChannel } from "discord.js"
import GuildManager from "./managers/GuildManager";
import CompasManager from "./managers/Compas/CompasManager";
import mongoose from "mongoose";
import connection from "./db";
import UserSchema from "./schemas/UserSchema";
import SoundSchema from "./schemas/SoundSchema";




export const client = new Client({ intents: ["Guilds", 
                                            "GuildMessages", 
                                            "DirectMessages", 
                                            "MessageContent", 
                                            "GuildVoiceStates", 
                                            "GuildMessageReactions", 
                                            "DirectMessageReactions", 
                                            "GuildPresences", 
                                            "GuildEmojisAndStickers", 
                                            "GuildIntegrations",
                                            "GuildMembers",
                                            "GuildScheduledEvents",
                                            "GuildWebhooks"], });


const guildManagers: Array<GuildManager> = [];

client.once("ready", () => {
    console.log("Runned chupapi bot!");
    
    client.guilds.cache.map(guild => {
        const guildManager = new GuildManager(guild);
        guildManagers.push(guildManager);
    });

});

client.on("messageReactionAdd", (reaction) => {
    // console.log(reaction)
});

client.on("messageCreate", async (message: Message) => {
    if (message.author.bot == true)
        return;

    // const compas = new CompasManager(message.author, message.channel as TextChannel, [], 0);

    // const mainGuild = client.guilds.cache.find(g => g.id == "762420182047260703")?.emojis;
    // const emojies = mainGuild?.cache.map(em => em)

    if (message.content[0] != ":")
        return;
    
    const commandName: string = message.content.split(" ")[0].slice(1);
    console.log(commandName)


    const guildId = message.guildId;
    let guildManager: GuildManager | undefined;

    for (const value of guildManagers)
        if (value.guild.id == guildId)
            guildManager = value;

    const channel = message.channel as TextChannel;

    guildManager.voiceManager.setTextChannel(channel);
    console.log(message.author.avatarURL())



    if (commandName == "play") {
        guildManager.voiceManager.addTrack(message.author, message.member, message.content.split(" ")[1]);
        message.delete();
    }

    if (commandName == "skip") {
        guildManager.voiceManager.skip();
        message.delete();
    }

    if (commandName == "gitler") {
        channel.send({ embeds: [new EmbedBuilder().setImage("https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTk1MTQzMjg1OTYwODc3MjU1/adolf-hitler-gettyimages-119505258.jpg")] })
    }

    if (commandName == "unpause")
        guildManager.voiceManager.audioPlayer.unpause();

    if (commandName == "sounds") {
        const _user = await UserSchema.findOne({ userId: message.author.id });

        if (!_user)
            return;

        const sounds = await SoundSchema.find({ addedBy: _user.id });

        console.log(sounds);
        channel.send("" + sounds.length);
    }
        
    // if (guildManager == undefined)
    //     return message.channel.send("This guild is not in my datebase. I am sorry:(");
    if (guildManager == undefined) {
        channel.send("This guild is not in my datebase. I am sorry:(");    
        return;
    }

    // for (const command of commands) {
    //     if (command.name == commandName)
    //         return await command.execute(message, client, guildManager);
    // }

    // channel.send("I can't find this command:(");
});

try {
    mongoose.connect(config.MONGO_URL).then((db) => {
        console.log("Successfully connected.")
        connection();
        client.login(config.DISCORD_TOKEN);
    });
} catch (error) {
    console.error("Don't have connection with db\n", error);
}
// console.log(config);