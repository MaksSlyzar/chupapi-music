import { User } from "discord.js";
import playdl, { playlist_info } from "play-dl";

import { SpotifyPlaylist } from "play-dl";
import MusicDto from "../../dtos/MusicDto";

class MusicDatas {
    musicList: Array<MusicDto> = [];
    index: number;

    constructor () {
        this.index = 0;
    }

    async addTrack (input: string, user: User) {
        try {
        
            const validate = await playdl.validate(input);

            if (validate == "sp_track") {
                const track = await playdl.spotify(input);
                const music = new MusicDto(track.name, user, "", track.url);
                music.platform = "spotify";
                music.imageURL = track.thumbnail.url;
                music.link = track.url;
                this.musicList.push(music);
            } else if (validate == "sp_playlist") {
                try {
                    const playlist = await playdl.spotify(input) as SpotifyPlaylist;
                    const allTracks = await playlist.all_tracks();

                    // console.log(allTracks);

                    allTracks.map((track => {
                        const music = new MusicDto(track.name, user, "", track.url);
                        music.owner = playlist.owner.name;
                        // music.ownerIcon = playlist.owner.url;
                        music.imageURL = track.thumbnail.url;
                        music.platform = "spotify";
                        music.time = track.durationInSec;
                        music.link = track.url;

                        this.musicList.push(music);
                    }));
                } catch (error) {
                    
                }
            } else if (validate == "yt_video") {
                const track = await (await playdl.video_basic_info(input)).video_details;
                const music = new MusicDto(track.title, user, "", track.url);
                music.likes = track.likes;
                music.views = track.views;
                music.time = track.durationInSec;
                music.owner = track.channel.name;
                music.platform = "youtube";
                music.imageURL = track.thumbnails[0].url;
                music.link = track.url;

                this.musicList.push(music);
            } else if (validate == "yt_playlist") {
                const playlist = await playdl.playlist_info(input);

                const minAllVideos = await playlist.all_videos();

                for (let i = 0; i < minAllVideos.length; i++) {
                    const videoMin = minAllVideos[i];
                    const track = await (await playdl.video_basic_info(videoMin.url)).video_details;

                    const music = new MusicDto(track.title, user, "", track.url);
                    music.time = track.durationInSec;
                    music.owner = track.channel.name;
                    music.platform = "youtube";
                    music.imageURL = track.thumbnails[0].url; 
                    music.link = track.url;

                    this.musicList.push(music);
                }
            } else if (validate == "search") {
                const search = await playdl.search(input);

                // console.log(search);
                // const music = search[0];

                const track = await (await playdl.video_basic_info(search[0].url)).video_details;
                const music = new MusicDto(track.title, user, "", track.url);
                music.likes = track.likes;
                music.views = track.views;
                music.time = track.durationInSec;
                music.owner = track.channel.name;
                music.platform = "youtube";
                music.imageURL = track.thumbnails[0].url;
                music.link = track.url;

                this.musicList.push(music);
            }

        } catch(e) {
            console.log("Error: catch 98 MusicDatas");
            
        }
    }

    getTrack () {
        return this.musicList[this.index];
    }

    getDiapTracks (from: number, to: number) {
        const tracks = [];

        for (let i = from; i < to; i++)
            if (this.musicList.length <= i)
                return tracks;
            else
                tracks.push(this.musicList[i]);
        // console.log(tracks);
        return tracks;
    }
}

export default MusicDatas;