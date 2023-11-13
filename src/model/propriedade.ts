import { Projeto } from "./projeto";

export class Propriedade{
    id:number = 0;
    nome : string = "";
    //valor e tipo serao tratados aqui (para saber se é data/select/etc e o valor)
    tipo: string = "";
    valor: string = "";
    projeto:Projeto = new Projeto;
}