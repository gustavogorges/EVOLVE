import { Equipe } from "./equipe";
import { Tarefa } from "./tarefa";

export class Usuario {
    id: number = 0;
    email: string = "";
    senha: string = "";
    nome : string = "";
    tarefasCriadas: Array<Tarefa> = new Array;
    equipesLideradas: Array<Equipe> = new Array;
}