
import { Historic } from "./historic";
import { Priority } from "./priority";
import { PriorityRecord } from "./PriorityRecord";
import { Project } from "./project";
import { Property } from "./propriedade/property";
import { Status } from "./status";
import { Subtask } from "./subtask";
import { User } from "./user";
import { Comment } from 'src/model/comment';
import { TaskFile } from "./file";


export class Task{
    id!: number ;
    name : string = "";
    favorited: boolean = false;

    finalDate!: Date;
    creationDate: string ="";

    schedulingData: string = ""; 
    description:string = "";
    currentStatus: Status = new Status;
  
    conclusionPercentage:number=0;
    priority:PriorityRecord = new PriorityRecord();

    comments:Array<Comment> = new Array;

    historic:Array<Historic> = new Array;

    creator:User = new User;
    project:Project | Partial<Project> = new Project;
    properties:Array<Property> = new Array;
    subtasks: Array<Subtask> = new Array;
    statusListIndex :number = -1;
    files : Array<TaskFile> = new Array;

    associates:Array<User|Pick<User, "id">> = new Array;
    isVisible: boolean = false;
    scheduledDate: Date = new Date;
    progress: number = 0; 
    
}