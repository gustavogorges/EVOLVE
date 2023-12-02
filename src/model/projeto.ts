import { Propriedade } from "./propriedade";
import { Tarefa } from "./tarefa";

export class Projeto{
    id: number = 0;
    nome: string = "";
    descricao: string ="";
    tarefas: Array<Tarefa> = new Array;
    propriedades:Array<Propriedade> = new Array;
  

}