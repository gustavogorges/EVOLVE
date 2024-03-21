import { UserChat } from "./userChat";
import { Team } from "./team";
import { Task } from "./task";

export class User {
    [x: string]: any;
    id!: number;
    email: string = "";
    password: string = "";
    name : string = "";
    profilePicture: string = '';
    chats:Array<UserChat> = new Array
    createdTasks: Array<Task> = new Array;
    managedTeams: Array<Team> = new Array;
    teams: Array<Team> = new Array;
    // image!:File
    imageColor!:string
}