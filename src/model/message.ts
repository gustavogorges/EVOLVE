import { Chat } from "./chat";
import { MessageStatus } from "./messageStatus";
import { Usuario } from "./usuario";

export class Message {
    id:number = 0;
    content:string = "";
    sender:Usuario = new Usuario;
    date:string = "";
    messageStatus:MessageStatus = 0;
    chat:Array<Chat> = new Array

}