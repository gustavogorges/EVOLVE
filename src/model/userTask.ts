import { Task } from "./task";
import { User} from "./user";

export class UsuarioTarefa{
    userId:number = 0;
    taskId:number = 0;
    user:User = new User;
    task:Task = new Task;
    workedHours:number = 0.0;
}