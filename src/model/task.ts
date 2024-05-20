
import { Historic } from "./historic";
import { Project } from "./project";
import { Property } from "./propriedade/property";
import { Status } from "./status";
import { Subtask } from "./subtask";
import { User } from "./user";
import { Comment } from 'src/model/comment';
import { File } from "./file";
import { PriorityRecord } from "./priorityRecord";


export class Task{
    id!: number ;
    name : string = "";
    favorited: boolean = false;

    finalDate!: Date;
    creationDate: string ="";
    lastTimeEdited : string="";
    scheduledDate: Date = new Date;

    description:string = "";
    historic:Historic[] = [];
    currentStatus: Status = new Status;
    priority:PriorityRecord = new PriorityRecord();
    comments:Array<Comment> = new Array;
    creator:User = new User;
    project:Project | Partial<Project> = new Project;
    properties:Array<Property> = new Array;
    subtasks: Array<Subtask> = new Array;
    associates:Array<User|Pick<User, "id">> = new Array;
    files : Array<File> = new Array;
    statusListIndex :number = -1;
    progress: number = 0; 
    concluded : boolean = false;
  
    conclusionPercentage:number=0;
    isVisible: boolean = false;

    schedulingData:string = "" //p que serve isso?

}