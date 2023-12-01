import { Propriedade } from "./propriedade";
import { Status } from "./status";
import { Tarefa } from "./tarefa";
import { Usuario } from "./usuario";

export class Projeto{
    id: number = 0;
    nome: string = "";
    dataFinal: string = "";
    descricao: string ="";
    tarefas: Array<Tarefa> = new Array;
    propriedades:Array<Propriedade> = new Array;
    listaStatus:Array<Status> = new Array;
    membros: Array<Usuario> = new Array;
    Administrador: Array<Usuario> = new Array;
    isVisible: boolean = false 
}