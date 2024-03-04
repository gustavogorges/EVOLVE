import { Priority } from "./priority";
import { PriorityRecord } from "./priorityRecord";
import { Project } from "./project";
import { Property } from "./propriedade/property";
import { Status } from "./status";
import { Subtask } from "./subtask";
import { User } from "./user";

export class Task{
    id: number = 0;
    name : string = "";
    favorited: boolean = false;
    finalDate: string = "";
    creationDate: string = "";
    schedulingData: string = ""; 
    description:string = "";
    currentStatus: Status = new Status;
  
    conclusionPercentage:number=0;
    priority:PriorityRecord = new PriorityRecord();

    creator:User = new User;
    project:Project = new Project;
    properties:Array<Property> = new Array;
    subtasks: Array<Subtask> = new Array;
    statusListIndex :number = -1;

    associates:Array<User> = new Array;
    isVisible: boolean = false;

}