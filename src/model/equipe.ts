import { Projeto } from "./projeto";
import { TeamChat } from "./team-chat";
import { Usuario } from "./usuario";

export class Equipe{
    id:number = 0;
    nome : string = "";
    imagem:string = "";
    administrador : Usuario = new Usuario;
    projetos: Array<Projeto> = new Array;
    participantes: Array<Usuario> = new Array;
    chat: TeamChat = new TeamChat
}