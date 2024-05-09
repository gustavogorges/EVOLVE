import { Property } from "./propriedade/property";

import { Status } from "./status";
import { Task } from "./task";
import { User } from "./user";
import { File } from "./file";
import { DashBoardCharts } from "./DashBoardCharts";
import { Team } from "./team";
import { Comment } from 'src/model/comment';
import { Chat } from "./chat";

export class Project {
    id!: number;
    name: string = "";
    description: string = "";
    favorited: boolean = false
    image: File = new File
    imageColor: string = "#000000"
    finalDate: string = "";
    creationDate: string = "";
    lastTimeEdited: string = "";
    comments: Array<Comment> = new Array;
    properties: Array<Property> = new Array;
    statusList: Array<Status> = new Array;
    team : Team = new Team;
    chat !: Chat;
    tasks: Array<Task> = new Array;
    members: Array<UserProject> = new Array;
    defaultRole:Role = new Role;
    charts: Array<DashBoardCharts> = new Array;
    isVisible: boolean = false
    editOn: boolean = false

}