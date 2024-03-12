import { TaskProjectProperty } from "./propriedade/task-project-property";

import { Status } from "./status";
import { Task } from "./task";
import { User } from "./user";
import { File } from "./file";

export class Project{
    id: number = 0;
    name: string = "";
    finalDate: string = "";
    description: string ="";
    imageColor:string="#000000"
    image:File = new File
    creator!:User
    adimnistrators:Array<User>=new Array
    members:Array<User> = new Array;
    properties:Array<TaskProjectProperty> = new Array;
    statusList : Array<Status> = new Array;
    tasks: Array<Task> = new Array;
    adimnistrator: Array<User> = new Array;
    isVisible: boolean = false 
}