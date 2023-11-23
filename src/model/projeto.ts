import { Propriedade } from "./propriedade";
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
    tarefas: Array<Tarefa> = new Array;
    propriedades:Array<Propriedade> = new Array;
}