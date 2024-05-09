import { Task } from "./task";
import { User} from "./user";

export class UsuarioTarefa{
    userId:number = 0;
    taskId:number = 0;
    user:User = new User;
    workedHours:number = 0;
    workedMinutes:number = 0;
    workedSeconds:number = 0;
}