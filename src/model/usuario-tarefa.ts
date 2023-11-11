import { Tarefa } from "./tarefa";
import { Usuario } from "./usuario";

export class UsuarioTarefa{
    usuarioId:number = 0;
    tarefaId:number = 0;
    usuario:Usuario = new Usuario;
    tarefa:Tarefa = new Tarefa;
    horasTrabalhadas:number = 0.0;
}