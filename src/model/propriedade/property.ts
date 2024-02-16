import { Project } from "../project";
import { PropertyType } from "./propertyType";
import { Select } from "./select";

export class Property{
    id:number = 0;
    name : string = "";
    //valor e tipo serao tratados aqui (para saber se é data/select/etc e o valor)
    //se for um select
    select: Select = new Select;
}