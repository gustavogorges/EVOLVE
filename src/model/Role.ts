import { Permission } from "./permission.";

export class Role{
    id!:number;
    name!:string;
    permissions:Permission[]=[];
}