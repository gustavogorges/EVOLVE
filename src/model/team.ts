import { Project } from "./project";
import { TeamChat } from "./teamChat";
import { User } from "./user";
import { File } from "./file";
import { TeamNotification } from "./teamNotification";
<<<<<<< HEAD
import { Role } from "./Role";
import { UserTeam } from "./userTeam";

export class Team {
    id!: number;
    name: string = "";
    image: File = new File;
    imageColor: String = "#000000"

    // adimnistrator : User = new User;

    participants: Array<UserTeam> = new Array;
=======
import { v4 as uuidv4 } from 'uuid';


export class Team{
    id!:number;
    name : string = "";
    image:TaskFile = new TaskFile;
    imageColor:String = "#000000"
    administrator : User = new User;
>>>>>>> dev
    projects: Array<Project> = new Array;
    chat: TeamChat = new TeamChat;
<<<<<<< HEAD
    personalWorkspace: boolean = false;
    roles:Array<Role> = new Array;
    defaultRole:Role = new Role;
    notifications: Array<TeamNotification> = new Array;
    booleanView: boolean = false;
=======
    notifications : Array<TeamNotification> = new Array;
    booleanView:boolean = false;
    code : String = 'tf';
>>>>>>> dev
}