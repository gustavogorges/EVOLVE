import { CardPermissions } from "./cardPermission";
import { PropertiePermissions } from "./propertiePermission";

export class UsuarioEquipe{
    userId: number = 0
    teamId : number = 0;
    propertiesPermissions: PropertiePermissions = new PropertiePermissions;
    cardsPermissions: CardPermissions = new CardPermissions;
}