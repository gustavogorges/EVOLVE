import { TarefaProjetoPropriedade } from "./propriedade/task-project-property";
import { Status } from "./status";
import { Tarefa } from "./tarefa";
import { Usuario } from "./usuario";

export class Projeto{
    id: number = 0;
    nome: string = "";
    descricao: string ="";
    imagem:string=""
    criador:Usuario = new Usuario
    administradores:Array<Usuario>=new Array
    membros:Array<Usuario> = new Array;
    dataFinal:string = "";
    propriedades:Array<TarefaProjetoPropriedade> = new Array;
    listaStatus : Array<Status> = new Array;
    tarefas: Array<Tarefa> = new Array;
}