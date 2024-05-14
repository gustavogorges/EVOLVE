import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class ProjectsInfoPerfilComponent implements OnInit, OnChanges {

  constructor(private service : BackendEVOLVEService) { }

  @Input()
  team !: Team
  @Input()
  user !: User

  ngOnChanges(changes: SimpleChanges): void {
    // Handle changes in input data
    console.log('Input data changed:', changes);
    if (changes['team'] || changes['user']) {
      // console.log(this.team.projects);
      
    }
  }

  ngOnInit(): void {
    console.log('Team name:', this.team?.name);
    // Initialize component properties
  }

 
  }
