import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';

@Component({
  selector: 'app-equipe-recente-card',
  templateUrl: './equipe-recente-card.component.html',
  styleUrls: ['./equipe-recente-card.component.scss']
})
export class EquipeRecenteComponent implements OnInit {

  @Input() team!: Team 

  constructor() { }

  ngOnInit(): void {
  }

}
