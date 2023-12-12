import { MessageStatus } from "../messageStatus";
import { Usuario } from "../usuario";


export class MessageDTO {
    id: Number = new Number;
    content:String = new String;
    sender:Usuario = new Usuario;
    date:String = new String;
    messageStatus:MessageStatus = 0;
    chatId:Number = new Number

}