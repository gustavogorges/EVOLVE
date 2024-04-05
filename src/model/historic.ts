import { User } from "./user";

export class Historic {
    id !: number;
    user : User = new User;
    description : string = "";
    dateTime : Date = new Date;
}