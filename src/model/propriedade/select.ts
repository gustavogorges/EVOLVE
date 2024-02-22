import { Opcao } from "./text";

export class Select{
    id!:number;
    possibleOptions:Array<Opcao> = new Array;
    uniqueValue: boolean = false
}