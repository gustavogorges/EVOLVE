import { Projeto } from "./project";
import { TeamChat } from "./team-chat";
import { User } from "./user";

export class Team{
    id:number = 0;
    name : string = "";
    image:string = "";
    adimnistrator : User = new User;
    projects: Array<Projeto> = new Array;
    participants: Array<User> = new Array;
    chat: TeamChat = new TeamChat
}