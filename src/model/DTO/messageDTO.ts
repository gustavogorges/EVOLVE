import { MessageStatus } from "../messageStatus";
import { User } from "../user";


export class MessageDTO {
    id!: Number;
    content:String = new String;
    sender:User = new User;
    date:String = new String;
    status:MessageStatus = 0;
    chatId:Number = new Number
    attachments: Array<File> = new Array

}