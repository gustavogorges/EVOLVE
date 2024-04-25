import { Project } from "./project";
import { Task } from "./task";
import { User } from "./user";

export class TeamNotification {
    id !: number;
    user : User = new User;
    task : Task = new Task;
    project : Project = new Project;
    readed : boolean = false;
    value : string = "";
    timeHour : string = "";
    timeDayAndMonth : string = "";
}