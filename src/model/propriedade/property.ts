import { Project } from "../project";
import { Task } from "../task";
import { PropertyType } from "./propertyType";
import { User } from "../user";
import { PropertyValue } from "./propertyValue";
import { Option } from "./option";


export class Property {
    id: number = 0;

    name : string = '';

    project: Project = new Project; // just if it is a global property

    propertyValues : Array<PropertyValue> =  [];

    propertyType !: PropertyType ;

    options : Array<Option> = [];

    editable:boolean = false;

    icon:string = '';


}