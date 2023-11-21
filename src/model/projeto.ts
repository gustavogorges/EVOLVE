import { Propriedade } from "./propriedade";
import { Status } from "./status";
import { Tarefa } from "./tarefa";

export class Projeto{
    id: number = 0;
    nome: string = "";
    descricao: string ="";
    tarefas: Array<Tarefa> = new Array;
    propriedades:Array<Propriedade> = new Array;
    listaStatus:Array<Status> = new Array;
}