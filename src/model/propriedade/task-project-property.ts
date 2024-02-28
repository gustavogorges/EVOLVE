import { Project } from "../project";
import { Property } from "./property";
import { Task } from "../task";
import { PropertyType } from "./propertyType";
import { User } from "../user";
import { Text } from "../propriedade/text";


export class TaskProjectProperty {
    id: number = 0;
    property: Property = new Property;
    task: Task = new Task;
    project: Project = new Project;

    values : Array<Text> =  [];

    type: PropertyType = PropertyType.TEXT;

    editable:boolean = false;

    icon:string = '';
}