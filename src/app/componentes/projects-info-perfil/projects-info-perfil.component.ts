import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';

@Component({
  selector: 'app-projects-info-perfil',
  templateUrl: './projects-info-perfil.component.html',
  styleUrls: ['./projects-info-perfil.component.scss']
})
export class ProjectsInfoPerfilComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {

    console.log(this.team?.projects);
    
      
    
  }
  @Input()
  team !: Team
  @Input()
  user !: User
  totalTask : number =0
   ngOnInit(): void {
    console.log(this.team?.name);
    
    this.team?.projects.map((p)=>{
      console.log(4);
      
      if(p.members.includes(this.user)){
        this.totalTask+=1
      }
    })
  }
  

}
