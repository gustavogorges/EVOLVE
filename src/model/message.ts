import { Chat } from "./chat";
import { MessageStatus } from "./messageStatus";
import { User } from "./user";

export class Message {
    id!:number;
    content:string = "";
    sender:User = new User;
    date:string = "";
    messageStatus:MessageStatus = 0;
    chat:Array<Chat> = new Array

}