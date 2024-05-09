import { Project } from "./project";
import { TeamChat } from "./teamChat";
import { User } from "./user";
import { File } from "./file";
import { TeamNotification } from "./teamNotification";

export class Team {
    id!: number;
    name: string = "";
    image: File = new File;
    imageColor: String = "#000000"

    // adimnistrator : User = new User;

    participants: Array<User> = new Array;
    projects: Array<Project> = new Array;
    chat: TeamChat = new TeamChat;
    personalWorkspace: boolean = false;
    roles:Array<Role> = new Array;
    defaultRole:Role = new Role;
    notifications: Array<TeamNotification> = new Array;
    booleanView: boolean = false;
}