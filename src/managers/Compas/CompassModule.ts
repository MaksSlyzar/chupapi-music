import { Message, TextChannel, User } from "discord.js";

class CompassModule {
    user: User;
    channel: TextChannel;
    message: Message|null;
    history: Array<CompassModule>;
    index: number;

    constructor (user: User, channel: TextChannel, history: Array<CompassModule>, index: number, message?: Message) {
        this.user = user;
        this.message = message?message:null;
        this.channel = channel;
        this.history = history;
        this.index = index;
    }

    setMessage (message: Message) {
        this.message = message;
    }

    pushHistory (module: CompassModule) {
        this.history.push(module);

        this.history[this.index + 1].updateHistory(this.history, this.index + 1);
    }

    updateHistory (history: Array<CompassModule>, index: number) {
        this.history = history;
        this.index = index;
    }

    backHistory () {
        console.log(this.index, "backhistory")
        this.index -= 1;
        this.history[this.index].updateHistory(this.history, this.index);
        this.history[this.index].generateMessage();
    }

    async generateMessage () { console.log("Generate message"); }

    frontHistory () {

    }

    async removeMessage () {
        await this.message.edit("Message removing...");

        setTimeout(() => {
            try {
                this.message.delete();
            } catch {
                console.log("error")
            }
        }, 5000);
    }
}

export default CompassModule;