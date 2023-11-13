import { Projeto } from "./projeto";
import { Propriedade } from "./propriedade";
import { Status } from "./status";
import { Subtarefa } from "./subtarefa";
import { Usuario } from "./usuario";

export class Tarefa{
    id: number = 0;
    nome : string = "";
    favoritado: boolean = false;
    datafinal: string = "";
    dataCriacao: string ="";
    status: Status = new Status;
    statusPossiveis:Array<Status> = new Array;
    criador:Usuario = new Usuario;
    projeto:Projeto = new Projeto;
    propriedades:Array<Propriedade> = new Array;
    subtarefas: Array<Subtarefa> = new Array;

}