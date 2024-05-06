import { Property } from "./propriedade/property";

import { Status } from "./status";
import { Task } from "./task";
import { User } from "./user";
import { TaskFile } from "./file";
import { DashBoardCharts } from "./DashBoardCharts";
import { Team } from "./team";
import { Comment } from 'src/model/comment';

export class Project{
    id!: number;
    name: string = "";
    finalDate: string = "";
    description: string ="";
    imageColor:string="#000000"
    image:TaskFile = new TaskFile
    creator!:User
    adimnistrators:Array<User> = new Array
    members:Array<User> = new Array;
    properties:Array<Property> = new Array;
    statusList : Array<Status> = new Array;
    tasks: Array<Task> = new Array;
    adimnistrator: Array<User> = new Array;
    charts: Array<DashBoardCharts> = new Array;
    comments:Array<Comment> = new Array;
    isVisible: boolean = false 
    team !: Team
    editOn: boolean = false
    favorited : boolean =false 

}