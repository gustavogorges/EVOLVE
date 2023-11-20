import { Component, Input, OnInit } from '@angular/core';
import { Equipe } from 'src/model/equipe';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-equipes-recentes',
  templateUrl: './equipes-recentes.component.html',
  styleUrls: ['./equipes-recentes.component.scss']
})
export class EquipesRecentesComponent implements OnInit {

  listaEquipes:Array<Equipe> = new Array

  constructor(private service: BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {

    this.listaEquipes = await this.service.getAllSomething("equipe")

  }

}
