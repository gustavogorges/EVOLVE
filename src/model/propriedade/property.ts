import { Projeto } from "../projeto";
import { Select } from "./select";

export class Propriedade{
    id:number = 0;
    name : string = "";
    //valor e tipo serao tratados aqui (para saber se é data/select/etc e o valor)
    select: Select = new Select
}