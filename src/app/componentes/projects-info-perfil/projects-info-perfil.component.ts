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
export class ProjectsInfoPerfilComponent implements OnInit {

  constructor(private service : BackendEVOLVEService) { }

  @Input()
  team !: Team
  @Input()
  user !: User

  ngOnInit(): void {
  }

 
  }
