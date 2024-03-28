import { joinVoiceChannel, AudioPlayer, createAudioPlayer, AudioPlayerStatus, createAudioResource, NoSubscriberBehavior, AudioPlayerState, VoiceConnectionStatus } from "@discordjs/voice";
import { Channel, Embed, EmbedBuilder, Guild, GuildMember, Message, TextChannel, User, VoiceChannel } from "discord.js";
import playdl from "play-dl";
import { Connection } from "mongoose";
import MusicDto from "../../dtos/MusicDto";
import MusicChecker from "./menus/MusicChecker";
import MusicDescription from "./menus/MusicDescription";
import MusicPlaylist from "./menus/MusicPlaylist";
import MusicDatas from "./MusicDatas";
import UserSchema from "../../schemas/UserSchema";
import SoundSchema from "../../schemas/SoundSchema";
import Progress from "./menus/Progress/ProgressSound";
import ProgressSound from "./menus/Progress/ProgressSound";

class VoiceManager {
    guild: Guild;
    message: Message;
    work: boolean;
    textChannel: TextChannel;
    voiceChannel: VoiceChannel;
    musicChecker: MusicChecker;
    musicDescription: MusicDescription;
    musicPlaylist: MusicPlaylist;
    musicDatas: MusicDatas; 
    audioPlayer: AudioPlayer;
    connection: any;
    nowWindow: "checker"|"playlist"|"description";
    tabsRefreshing: number = 0;
    hearTime: number = 0;
    hearStartTime: number = 0;
    state: {
        play: boolean,
    };
    canPause: number = Date.now();
    paused: boolean = false;

    startUsersInChannel: Array<string>;

    progress: Progress;
    musicPlayableTime: number = 0;
    
    menuEmbedContent: EmbedBuilder;
    updateProgressSound: boolean = false;
    latestWindow: string = "";
    newUpdateProgress: boolean = false;

    constructor (guild: Guild) {
        this.guild = guild;
        this.work = false;
        this.musicDatas = new MusicDatas();
        this.progress = new ProgressSound(this);

        this.state = {
            play: false
        };
        this.timer();
    }

    async chooseWindow (window: "checker"|"playlist"|"description") {
        if (window == "checker") {
            await this.musicChecker.refresh(this.musicDatas.getTrack());
            this.updateProgressSound = this.musicChecker.updateProgressSound;
        }
        if (window == "playlist") {
            await this.musicPlaylist.refresh();
            this.updateProgressSound = this.musicPlaylist.updateProgressSound;
        }
        if (window == "description") {
            await this.musicDescription.refresh();
            this.updateProgressSound = this.musicDescription.updateProgressSound;
        }
    }

    getWindow () {
        if (this.nowWindow == "checker") {
            return this.musicChecker;
        }
        if (this.nowWindow == "playlist") {
            return this.musicPlaylist;
        }
        if (this.nowWindow == "description") {
            return this.musicDescription;
        }
    }

    async addTrack (includingUser: User, member: GuildMember, trackStr: string) {
        await this.musicDatas.addTrack(trackStr, includingUser);

        if (this.work == false) {
            this.message = await this.textChannel.send("Wait pls:)");
            this.musicChecker = new MusicChecker(this, this.message);
            this.nowWindow = "checker";
            this.musicPlaylist = new MusicPlaylist(this, this.message);
            this.musicDescription = new MusicDescription(this, this.message);
            
            const connection = joinVoiceChannel({
				channelId: member.voice.channelId,
				guildId: this.message.guildId,
                debug: true,
				adapterCreator: this.message.guild.voiceAdapterCreator
			});

            connection.on("debug", (debugMessage) => {
                
            });

            this.audioPlayer = createAudioPlayer();
			connection.subscribe(this.audioPlayer);

            this.connection = connection;

            connection.on("stateChange", (oldState, newState) => {
                // if (
                //     oldState.status === VoiceConnectionStatus.Ready &&
                //     newState.status === VoiceConnectionStatus.Connecting
                // ) {
                //     connection.configureNetworking();
                // }

                if (newState.status == "disconnected") {
                    // this.textChannel.send("Ясно, адмін тупоголовий хуєсос.");
                }

                const oldNetworking = Reflect.get(oldState, 'networking');
                const newNetworking = Reflect.get(newState, 'networking');

                const networkStateChangeHandler = (oldNetworkState: any, newNetworkState: any) => {
                    const newUdp = Reflect.get(newNetworkState, 'udp');
                    clearInterval(newUdp?.keepAliveInterval);
                }

                oldNetworking?.off('stateChange', networkStateChangeHandler);
                newNetworking?.on('stateChange', networkStateChangeHandler);

            });

            this.audioPlayer.on(AudioPlayerStatus.Playing, (state: AudioPlayerState) => {
                this.paused = false;
                this.hearStartTime = Date.now();
                this.state.play = true;
                this.startUsersInChannel = [];
                member.voice.channel.members.map(user => {
                    this.startUsersInChannel.push(user.id);
                });

                this.addTrackIntoDb();
			});

            this.audioPlayer.on(AudioPlayerStatus.Idle, () => {

                // const users: Array<string> = [];
                // // this.voiceChannel.members.map(user => {
                // //     if (user.id in this.startUsersInChannel) {
                // //         users.push(user.id);
                // //     }
                // // });
                // this.addHoursIntoDb(users);

                this.hearTime += Date.now() - this.hearStartTime;

                if (this.hearTime > 25000) {
                    // this.addTrackIntoDb();
                }
                
                this.state.play = false;
                this.musicPlayableTime = 0;
                this.musicDatas.index++;
                
                // console.log("HEAR TIME!!!", this.hearTime / 1000)
                if (!this.musicDatas.getTrack()) {
                    // console.log("Return")
                    this.work = false;
                    this.deleteMessage();
                    return;
                }

                if (this.nowWindow == "checker") {
                    this.musicChecker.refresh(this.musicDatas.getTrack());
                    this.updateProgressSound = this.musicChecker.updateProgressSound;
                }
                if (this.nowWindow == "playlist") {
                    this.musicPlaylist.refresh(); 
                    this.updateProgressSound = this.musicPlaylist.updateProgressSound;
                }

                this.playStream();
			});

            this.audioPlayer.on(AudioPlayerStatus.AutoPaused, (state: AudioPlayerState ) => {
                console.log("Autopaused, status:");
            });

            this.audioPlayer.on(AudioPlayerStatus.Paused, () => {
                console.log("Paused")
                this.paused = true;
                this.state.play = false;
            });

            this.audioPlayer.on(AudioPlayerStatus.Buffering, () => {

            });

            this.audioPlayer.on("error", () => {
                console.log("Error");
            });

            this.playStream();
            //
            // const music = new MusicDto("Ichi ni san pyro", includingUser);

            // this.musicChpecker.refresh(music);
            this.work = true;
            
            this.musicChecker.refresh(await this.musicDatas.getTrack());

            return;
        }

        if (this.nowWindow == "checker") {
            this.musicChecker.refresh(this.musicDatas.getTrack());
        }

        if (this.nowWindow == "playlist") {
            this.musicPlaylist.refresh();
        }
        // await this.musicDatas.addTrack("DK я тут");
    }

    async addHoursIntoDb (userIds: Array<string>) {

    }

    deleteMessage () {
        // this.message.edit({ content: this.musicDatas.musicList.map(sound: MusicDto) => {
            
        // }, embeds: [], components: [] });

        const content = this.musicDatas.musicList.map((music: MusicDto) => {
            return `${music.title}\n${music.link}\n`
        }).join("\n");

        this.musicDatas.musicList = [];
        this.musicDatas.index = 0;
        this.message.delete();
        // this.textChannel.send(content);
    }

    async addTrackIntoDb() {
        const music = this.musicDatas.getTrack();
        let user = await UserSchema.findOne({ userId: music.includingUser.id });
        
        if (user == null) {
            user = new UserSchema({ userId: music.includingUser.id, history: [] });
            await user.save();
        }

        const sound = new SoundSchema({link: music.link, date: Date.now(), addedBy: user.id });
        
        await sound.save();

        // console.log(user, sound);
    }

    async playStream () {
        const track = this.musicDatas.getTrack();

        if (!track)
            return;

        try {
            const stream = await playdl.stream(this.musicDatas.getTrack().link, {
                discordPlayerCompatibility: true,
            });
            // console.log("stream", stream)
            // console.log(stream, "stream")
            
            const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
            });

            // console.log(resource.playbackDuration);


            // const read = resource.read();
            // console.log(read)
            // resource.playbackDuration = track.time * 1000;
            // console.log(resource.ended);
            // console.log(resource);

            // resource.
            this.audioPlayer.play(resource);
        } catch (error) {
            // console.log(this.musicDatas.getTrack().link, error, "ERRORRRRR");
        }
    }

    async pause () {
        if ((Date.now() - this.canPause) / 1000 > 2) {
            this.canPause = Date.now();
            try {
                console.log("PAUSE")
                this.audioPlayer.pause();
            } catch {

            }
        }
    }

    async unpause () {
        if ((Date.now() - this.canPause) / 1000 > 2) {
            this.canPause = Date.now();
            try {
                console.log("UNPAUSE")
                this.audioPlayer.unpause();
                
            } catch {

            }
        }
    }

    async next () {

    }

    timer () {
        if (this.state.play == true && this.paused == false) {
            this.musicPlayableTime++;

            const musicTimeStep = Math.floor(this.musicDatas.getTrack().time / 10);
            const window = this.getWindow();

            if (this.musicPlayableTime % musicTimeStep == 0 || this.musicPlayableTime == 1) {
                this.progress.update();
            }

            if (this.newUpdateProgress) {
                this.progress.update();
                this.newUpdateProgress = !this.newUpdateProgress;
            }
        }

        setTimeout(() => this.timer(), 1000);
    }

    async skip () {
        this.audioPlayer.stop();
        // this.musicDatas.index++;
        // this.playStream();
    }

    async prev () {
        
    }

    async refresh () {

    }

    setTextChannel (channel: TextChannel) {
        this.textChannel = channel;
    }
}

export default VoiceManager;