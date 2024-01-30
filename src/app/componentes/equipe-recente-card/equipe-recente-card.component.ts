import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/model/project';

@Component({
  selector: 'app-equipe-recente-card',
  templateUrl: './equipe-recente-card.component.html',
  styleUrls: ['./equipe-recente-card.component.scss']
})
export class EquipeRecenteComponent implements OnInit {

  @Input() projeto: Project = new Project

  constructor() { }

  ngOnInit(): void {
  }

}
