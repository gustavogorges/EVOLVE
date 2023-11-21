import { Component, Input, OnInit } from '@angular/core';
import { Equipe } from 'src/model/equipe';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-equipes-recentes',
  templateUrl: './equipes-recentes.component.html',
  styleUrls: ['./equipes-recentes.component.scss']
})
export class EquipesRecentesComponent implements OnInit {

  listaEquipes: Array<Equipe> = new Array

  indiceVisualizacao: number = 0
  listaEquipesVisualizacao: Array<Equipe> = new Array

  constructor(private service: BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {

    this.listaEquipes = await this.service.getAllSomething("equipe")
    this.montarListaVisualizacao()

  }

  avancarVisualizacaoCarrosel() {
    this.indiceVisualizacao++;
    if (this.indiceVisualizacao >= this.listaEquipes.length) {
      this.indiceVisualizacao = 0;
    }
    this.montarListaVisualizacao()
  }

  regredirVisualizacaoCarrosel() {
    this.indiceVisualizacao--;
    if (this.indiceVisualizacao < 0) {
      this.indiceVisualizacao = this.listaEquipes.length - 1;
    }
    this.montarListaVisualizacao()
  }

  montarListaVisualizacao() {

    this.listaEquipesVisualizacao[0] = this.listaEquipes[this.indiceVisualizacao]
    this.listaEquipesVisualizacao[1] = this.listaEquipes[this.indiceVisualizacao + 1]
    this.listaEquipesVisualizacao[2] = this.listaEquipes[this.indiceVisualizacao + 2]

    if (this.indiceVisualizacao == this.listaEquipes.length - 2) {
      this.listaEquipesVisualizacao[2] = this.listaEquipes[0]
    }
    if (this.indiceVisualizacao == this.listaEquipes.length - 1) {
      this.listaEquipesVisualizacao[1] = this.listaEquipes[0]
      this.listaEquipesVisualizacao[2] = this.listaEquipes[1]
    }

    if (this.listaEquipes.length == 2) {
      this.listaEquipesVisualizacao.splice(0, 1)
    }
    if (this.listaEquipes.length == 1) {
      this.listaEquipesVisualizacao.splice(1, 2)
    }

  }

}
