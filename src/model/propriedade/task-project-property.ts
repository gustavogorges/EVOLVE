import { Projeto } from "../projeto";
import { Propriedade } from "./property";
import { Tarefa } from "../tarefa";
import { TipoPropriedade } from "./propertyType";
import { Usuario } from "../usuario";


export class TarefaProjetoPropriedade {
    id: number = 0;
    propriedade: Propriedade = new Propriedade;
    tarefa: Tarefa = new Tarefa;
    projeto: Projeto = new Projeto;

    value: number | string | Date | Array<Usuario> | Array<string> = ""
}