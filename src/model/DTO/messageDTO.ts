import { MessageStatus } from "../messageStatus";
import { User } from "../user";


export class MessageDTO {
    id: Number = new Number;
    content:String = new String;
    sender:User = new User;
    date:String = new String;
    messageStatus:MessageStatus = 0;
    chatId:Number = new Number

}