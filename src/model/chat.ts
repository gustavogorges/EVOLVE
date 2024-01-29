import { Message } from "./message";
import { Usuario } from "./usuario";

export abstract class Chat {

    id:number = 0;
    messages:Array<Message> = new Array
    users:Array<Usuario> = new Array

}