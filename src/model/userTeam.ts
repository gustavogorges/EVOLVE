import { Role } from "./Role";
import { Team } from "./team";
import { User } from "./user";

export class UserTeam{
    userId: number = 0
    teamId : number = 0;
    team:Team = new Team;
    user:User = new User;
    role:Role = new Role
    manager:boolean = false;

}