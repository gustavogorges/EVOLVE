import { Message } from "./message";
import { User } from "./user";

export abstract class Chat {

    id!:number;
    messages:Array<Message> = new Array
    users:Array<User> = new Array

}