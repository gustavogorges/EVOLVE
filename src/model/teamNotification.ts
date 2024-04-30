import { Project } from "./project";
import { Task } from "./task";
import { User } from "./user";

export class TeamNotification {
    id !: number;
    notificatedUsers : Array<User> = new Array;
    actionUser : User = new User;
    readed : boolean = false;
    value : string = "";
    dateTime : Date = new Date;
}