import { Projeto } from "../projeto";
import { TipoPropriedade } from "./propertyType";
import { Select } from "./select";

export class Propriedade{
    id:number = 0;
    name : string = "";
    //valor e tipo serao tratados aqui (para saber se é data/select/etc e o valor)
    //se for um select
    possibleOptions: Select = new Select
    tipo: TipoPropriedade = 0
}