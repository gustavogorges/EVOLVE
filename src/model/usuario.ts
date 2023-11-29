import { Equipe } from "./equipe";
import { Tarefa } from "./tarefa";

export class Usuario {
    id: number = 0;
    email: string = "";
    senha: string = "";
    nome : string = "";
    testeImagem: string = ""

    fotoPerfil:string = "";
    tarefasCriadas: Array<Tarefa> = new Array;
    equipesAdministradas: Array<Equipe> = new Array;
    equipes: Array<Equipe> = new Array;
}