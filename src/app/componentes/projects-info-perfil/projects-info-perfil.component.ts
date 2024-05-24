import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { hasPermission, hasPermissionProject } from 'src/app/shared/check-permissions';
import { Permission } from 'src/model/permission.';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';


@Component({
  selector: 'app-projects-info-perfil',
  templateUrl: './projects-info-perfil.component.html',
  styleUrls: ['./projects-info-perfil.component.scss']
})
export class ProjectsInfoPerfilComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route:ActivatedRoute) { }

  @Input()
  team !: Team
  user2!:User

  projects:Project[]=[]
  projetsToShow:boolean[]=[]

  async ngOnInit(): Promise<void> {

    this.route.paramMap.subscribe( async params  => {
      // Obtém o parâmetro do projeto da rota
      const projectId = params.get('userId');
      const id  = Number(projectId)
      this.user2 = await this.service.getOne('user', id);
      this.projects = await this.service.getProjectsByUserId(this.user2.id)
      console.log(this.projects);
      console.log("this.projects");
      for(let projectFor of this.team.projects){
        this.hasPermission(projectFor)
      }
    })


    
  }

  hasPermission(project2:Project){
    
  
      let result:boolean = this.projects?.map(project => project.id).includes(project2.id);

      console.log(result);
      console.log(project2);
      
      console.log("result5");
      
      this.projetsToShow.push(result)
  }

 
  }
