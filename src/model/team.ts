import { Project } from "./project";
import { TeamChat } from "./teamChat";
import { User } from "./user";
import { File } from "./file";

export class Team{
    id!:number;
    name : string = "";
    image:File = new File;
    imageColor:String = "#000000"
    administrator : User = new User;
    projects: Array<Project> = new Array;
    participants: Array<User> = new Array;
    chat: TeamChat = new TeamChat
}