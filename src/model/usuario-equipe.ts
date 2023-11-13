import { PermissaoCards } from "./permissaoCards";
import { PermissaoPropriedades } from "./permissaoPropriedades";

export class UsuarioEquipe{
    usuarioId: number = 0
    equipeId : number = 0;
    permissaoPropriedades: PermissaoPropriedades = new PermissaoPropriedades;
    permissaoCards: PermissaoCards = new PermissaoCards;
}