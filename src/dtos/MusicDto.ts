import { User } from "discord.js";

class MusicDto {
    title: string;
    description: string;
    likes: number;
    views: number;
    time: number;
    link: string;
    includingUser: User;
    platform: "spotify"|"youtube"|"soundcloud";
    playlist: string|null;
    playlistURL: string;
    owner: string;
    ownerURL: string;
    ownerIcon: string;
    imageURL: string;

    constructor (title: string, includingUser: User, description: string, url: string) {
        title = title.replace("||", " ");

        this.title = title;
        this.includingUser = includingUser;
    }
}

export default MusicDto;