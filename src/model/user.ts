import { UserChat } from "./userChat";
import { Task } from "./task";
import { File } from "./file";
import { UserProject } from "./userProject";
import { UserTeam } from "./userTeam";

export class User {
    [x: string]: any;
    id!: number;
    email: string = "";
    password: string = "";
    name : string = "";
    imageColor!:String 
    image!:File
    chats:Array<UserChat> = new Array
    createdTasks: Array<Task> = new Array;
    projectRoles:UserProject[] = []
    teamRoles: Array<UserTeam> = new Array;

    theme: string = "light"; 
    primaryColor: string = "#185E77"; 
    secondaryColor: string = "#4C956C"; 
    primaryDarkColor: string = "#67BFE0"; 
    secondaryDarkColor: string = "#86C19F"; 
    fontSize : number =16; 
    currentRole : string = '';

    socialLogin:boolean = false
 
}