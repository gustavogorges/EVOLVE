import { Permission } from "src/model/permission.";
import { Project } from "src/model/project";
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
                    console.log(88888);
                    
                    boolean= true;
                }
            })
        }
      
    })
    return boolean;
}


export function hasPermissionProject(userId : number, project : Project, permission : any): boolean{
    let boolean = false
    
    project.members.map((userProject)=>{
        if(userProject.userId == userId){
            console.log(userProject.role);
            
            userProject.role.permissions.forEach(u=> {
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