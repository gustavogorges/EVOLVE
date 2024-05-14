import { Project } from "../project";
import { Task } from "../task";
import { PropertyType } from "./propertyType";
import { User } from "../user";
import { PropertyValue } from "./propertyValue";
import { Option } from "./option";


export class Property {
    id: number = 0;

    name : string = '';

    propertyValues : Array<PropertyValue> =  [];

    propertyType !: PropertyType ;

    options : Array<Option> = [];
    currentOptions : Array<Option> = [];
    global : boolean = false; // if is a global property, will get the project by the task of it

    editable:boolean = false;

    icon:string = '';


}