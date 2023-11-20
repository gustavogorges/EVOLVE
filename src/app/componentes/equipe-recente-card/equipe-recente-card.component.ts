import { Component, Input, OnInit } from '@angular/core';
import { Equipe } from 'src/model/equipe';

@Component({
  selector: 'app-equipe-recente-card',
  templateUrl: './equipe-recente-card.component.html',
  styleUrls: ['./equipe-recente-card.component.scss']
})
export class EquipeRecenteComponent implements OnInit {

  @Input() equipe: Equipe = new Equipe

  constructor() { }

  ngOnInit(): void {
  }

}
