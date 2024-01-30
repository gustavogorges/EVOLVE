import { Projeto } from "../project";
import { Property } from "./property";
import { Task } from "../task";
import { PropertyType } from "./propertyType";
import { User } from "../user";


export class TaskProjectProperty {
    id: number = 0;
    property: Property = new Property;
    task: Task = new Task;
    project: Projeto = new Projeto;

    value: number | string | Date | Array<User> | Array<string> = ""
}