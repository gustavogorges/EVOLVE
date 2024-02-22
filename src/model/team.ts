import { Project } from "./project";
import { TeamChat } from "./team-chat";
import { User } from "./user";

export class Team{
    id!:number;
    name : string = "";
    image:string = "";
    adimnistrator : User = new User;
    projects: Array<Project> = new Array;
    participants: Array<User> = new Array;
    chat: TeamChat = new TeamChat
}