import { Message } from "./MessageModel";

export class MessageDuration{
    message!: Message
    duration!: number

    constructor(message: Message, duration: number){
        this.message = message
        this.duration = duration
    }
}