import { Projeto } from "./projeto";
import { Usuario } from "./usuario";

export class Equipe{
    id:number = 0;
    nome : string = "";
    lider : Usuario = new Usuario;
    projetos: Array<Projeto> = new Array;
}