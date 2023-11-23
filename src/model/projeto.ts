import { TarefaProjetoPropriedade } from "./propriedade/TarefaProjetoPropriedade";
import { Status } from "./status";
import { Tarefa } from "./tarefa";

export class Projeto{
    id: number = 0;
    nome: string = "";
    descricao: string ="";
    dataFinal:string = "";
    propriedades:Array<TarefaProjetoPropriedade> = new Array;
    listaStatus : Array<Status> = new Array;
    tarefas: Array<Tarefa> = new Array;
}