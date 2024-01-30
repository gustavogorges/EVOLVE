import { Message } from "./message";
import { User } from "./user";

export abstract class Chat {

    id:number = 0;
    messages:Array<Message> = new Array
    users:Array<User> = new Array

}