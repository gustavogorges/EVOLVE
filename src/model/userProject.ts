import { Role } from "./Role";
import { Project } from "./project";
import { User } from "./user";

export class UserProject{
    userId!:number;
    projectId!:number;
    user!:User;
    project!:Project;
    role!:Role;
    isManager:boolean = false;
}