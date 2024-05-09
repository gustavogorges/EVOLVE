import { UserChat } from "./userChat";
import { Task } from "./task";
import { TaskFile } from "./file";
import { UserProject } from "./userProject";
import { UserTeam } from "./userTeam";

export class User {
    [x: string]: any;
    id!: number;
    email: string = "";
    password: string = "";
    name : string = "";
    imageColor!:String 
    image!:TaskFile

    chats:Array<UserChat> = new Array
    createdTasks: Array<Task> = new Array;
    projectRoles:UserProject[] = []
    teams: Array<UserTeam> = new Array;

    theme: string = "light"; 
    primaryColor: string = "#185E77"; 
    secondaryColor: string = "#4C956C"; 
    primaryDarkColor: string = "#67BFE0"; 
    secondaryDarkColor: string = "#86C19F"; 
    fontSize : number =16; 
 
}