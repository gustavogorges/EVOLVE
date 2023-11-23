import { Projeto } from "../projeto";
import { Propriedade } from "./propriedade";
import { Tarefa } from "../tarefa";
import { TipoPropriedade } from "./tipoPropriedade";


export class TarefaProjetoPropriedade {
    id: number = 0;
    propriedade: Propriedade = new Propriedade;
    tarefa: Tarefa = new Tarefa;
    projeto: Projeto = new Projeto;
    tipo: TipoPropriedade = 0
}