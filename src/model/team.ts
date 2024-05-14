import { Project } from "./project";
import { TeamChat } from "./teamChat";
import { User } from "./user";
import { TaskFile } from "./file";
import { TeamNotification } from "./teamNotification";
import { v4 as uuidv4 } from 'uuid';


export class Team{
    id!:number;
    name : string = "";
    image:TaskFile = new TaskFile;
    imageColor:String = "#000000"
    administrator : User = new User;
    projects: Array<Project> = new Array;
    participants: Array<User> = new Array;
    chat: TeamChat = new TeamChat;
    notifications : Array<TeamNotification> = new Array;
    booleanView:boolean = false;
    code : String = 'tf';
}