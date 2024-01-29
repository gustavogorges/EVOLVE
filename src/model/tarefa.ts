import { Prioridade } from "./prioridade";
import { Projeto } from "./projeto";
import { Propriedade } from "./propriedade/property";
import { TarefaProjetoPropriedade } from "./propriedade/task-project-property";
import { Status } from "./status";
import { Subtarefa } from "./subtarefa";
import { Usuario } from "./usuario";

export class Tarefa{
    id: number = 0;
    nome : string = "";
    favoritado: boolean = false;
    dataFinal: string = "";
    dataCriacao: string ="";
    descricao:string = "";
    statusAtual: Status = new Status;
  
    porcentagemConclusao:number=0;
    prioridade:Prioridade = 0;

    criador:Usuario = new Usuario;
    projeto:Projeto = new Projeto;
    propriedades:Array<TarefaProjetoPropriedade> = new Array;
    subtarefas: Array<Subtarefa> = new Array;
    statusListIndex :number = -1;

    associados:Array<Usuario> = new Array;
    isVisible: boolean = false;

}