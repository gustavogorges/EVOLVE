import { Permission } from "src/model/permission.";
import { Team } from "src/model/team";
import { UserTeam } from "src/model/userTeam";

export function hasPermission(userId : number, team : Team, permission : any): boolean{
    let boolean = false
    console.log(team);
    
    team.participants.map((userTeam)=>{
        if(userTeam.userId == userId){
            console.log(userTeam.role);
            
            userTeam.role.permissions.forEach(u=> {
                console.log(u);
                
                console.log(permission);
                
                if(u==permission){
                    boolean= true;
                }
            })
        }
      
    })
    return boolean;
}
