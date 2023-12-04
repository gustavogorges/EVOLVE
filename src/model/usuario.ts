import { UserChat } from "./userChat";
import { Equipe } from "./equipe";
import { Tarefa } from "./tarefa";

export class Usuario {
    [x: string]: any;
    id: number = 0;
    email: string = "";
    senha: string = "";
    nome : string = "";
    fotoPerfil: string = '';
    chats:Array<UserChat> = new Array
    fotoPerfil:string = "";
    tarefasCriadas: Array<Tarefa> = new Array;
    equipesAdministradas: Array<Equipe> = new Array;
    equipes: Array<Equipe> = new Array;
}