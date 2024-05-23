import { Permission } from "src/model/permission.";
import { Project } from "src/model/project";
import { Team } from "src/model/team";
import { UserTeam } from "src/model/userTeam";

export function hasPermission(userId : number, team : Team, permission : any): boolean{
    let boolean = false
    
    team?.participants.map((userTeam)=>{
        if(userTeam.userId == userId){
            
            userTeam.role.permissions.forEach(u=> {

                if(u==permission){
                    boolean= true;
                }
            })
        }
      
    })
    return boolean;
}


export function hasPermissionProject(userId : number, project : Project, permission : any): boolean{
    let boolean = false
    
    console.log(project);
    
    project?.members?.map((userProject)=>{
        console.log(project);
        
        
        if(userProject.userId == userId){
            console.log(userProject);
            
            
            userProject.role.permissions.forEach(u=> {
                if(u==permission){
                    boolean= true;
                }
            })
        }
      
    })
    return boolean;
}