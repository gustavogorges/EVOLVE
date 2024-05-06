import { Project } from "./project";
import { Task } from "./task";
import { User } from "./user";

export class Comment {
    id!:number;
    user : User = new User;
    task : Task = new Task;
    value : string = "";
    timeHour : string = "";
    timeDayAndMonth : string = "";
}