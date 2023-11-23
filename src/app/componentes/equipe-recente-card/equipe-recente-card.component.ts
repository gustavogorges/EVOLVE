import { Component, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/projeto';

@Component({
  selector: 'app-equipe-recente-card',
  templateUrl: './equipe-recente-card.component.html',
  styleUrls: ['./equipe-recente-card.component.scss']
})
export class EquipeRecenteComponent implements OnInit {

  @Input() projeto: Projeto = new Projeto

  constructor() { }

  ngOnInit(): void {
  }

}
