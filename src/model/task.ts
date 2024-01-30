import { Priority } from "./priority";
import { Projeto } from "./project";
import { Property } from "./propriedade/property";
import { TaskProjectProperty } from "./propriedade/task-project-property";
import { Status } from "./status";
import { Subtask } from "./subtask";
import { User } from "./user";

export class Task{
    id: number = 0;
    name : string = "";
    favorited: boolean = false;
    finalDate: string = "";
    creationDate: string ="";
    description:string = "";
    currentStatus: Status = new Status;
  
    conclusionPercentage:number=0;
    priority:Priority = 0;

    creator:User = new User;
    project:Projeto = new Projeto;
    properties:Array<TaskProjectProperty> = new Array;
    subtasks: Array<Subtask> = new Array;
    statusListIndex :number = -1;

    associates:Array<User> = new Array;
    isVisible: boolean = false;

}