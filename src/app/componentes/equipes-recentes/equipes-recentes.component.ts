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
  // Indice do elemento a ser mostrado 
  indiceVisualizacao: number = 0;
  // Variável para controlar a exibição das setas
  mostrarSetas: boolean = false; 

  constructor(private service: BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.listaEquipes = await this.service.getAllSomething("equipe");
    this.atualizarMostrarSetas();
  }

  avancarVisualizacaoCarrosel() {
    this.indiceVisualizacao = (this.indiceVisualizacao + 1) % this.listaEquipes.length;
    this.atualizarMostrarSetas();
  }

  regredirVisualizacaoCarrosel() {
    this.indiceVisualizacao = (this.indiceVisualizacao - 1 + this.listaEquipes.length) % this.listaEquipes.length;
    this.atualizarMostrarSetas();
  }

  atualizarMostrarSetas() {
    // Mostrar setas apenas se houver mais de três equipes
    this.mostrarSetas = this.listaEquipes.length > 3; 
  }

  get listaEquipesVisualizacao(): Equipe[] {
    if (this.listaEquipes.length <= 3) {
      // Se houver 3 ou menos equipes, exibe todas opa amigos
      return this.listaEquipes;
    } else {
      // Retorna um array "[]" com as equipes a serem exibidas com base no índice atual
      return [
        this.listaEquipes[this.indiceVisualizacao],
        this.listaEquipes[(this.indiceVisualizacao + 1) % this.listaEquipes.length],
        this.listaEquipes[(this.indiceVisualizacao + 2) % this.listaEquipes.length]
      ];
    }
  }

  //OBS: o uso da lógica de "% this.listaequipes" faz com que o indice não ultrapasse 
  //a quantidade de elementos da lista e caso ultrapasse volte ao começo (0)
  //EX1: indice (1) % lista.length(7) = 1;
  //EX2: indice (8) % lista.length(7) = 1;
  //OBS: 1 nesse caso representa o segundo elemento da lista, pois ela começa em 0, então 
  //quando indice = 8 ele teria dado uma volta inteira na lista e voltado ao segundo elemento 

}