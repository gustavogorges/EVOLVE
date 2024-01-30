import { TaskProjectProperty } from "./propriedade/task-project-property";

import { Status } from "./status";
import { Task } from "./task";
import { User } from "./user";

export class Projeto{
    id: number = 0;
    name: string = "";
    finalDate: string = "";
    description: string ="";
    image:string=""
    creator!:User
    adimnistrators:Array<User>=new Array
    members:Array<User> = new Array;
    properties:Array<TaskProjectProperty> = new Array;
    statusList : Array<Status> = new Array;
    tasks: Array<Task> = new Array;
    adimnistrator: Array<User> = new Array;
    isVisible: boolean = false 
}