import { Propriedade } from "./propriedade";
import { Tarefa } from "./tarefa";
import { Usuario } from "./usuario";

export class Projeto{
    id: number = 0;
    nome: string = "";
    dataFinal: string = "";
    descricao: string ="";
    tarefas: Array<Tarefa> = new Array;
    propriedades:Array<Propriedade> = new Array;
    membros: Array<Usuario> = new Array;
    Administrador: Array<Usuario> = new Array;
    isVisible: boolean = false 
}