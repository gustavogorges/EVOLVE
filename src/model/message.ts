import { Chat } from "./chat";
import { MessageStatus } from "./messageStatus";
import { User } from "./user";

export class Message {
    id!:number;
    attachments:Array<File> = new Array
    content:string = "";
    sender:User = new User;
    date:string = "";
    status:MessageStatus = 0;
    chat!:Chat

}