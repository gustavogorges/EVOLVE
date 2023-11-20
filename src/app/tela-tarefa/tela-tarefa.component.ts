import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-tarefa',
  templateUrl: './tela-tarefa.component.html',
  styleUrls: ['./tela-tarefa.component.scss']
})
export class TelaTarefaComponent implements OnInit {
  selectedVisualizacao = "Visualização";
  select : string = "Padrao";

  lista = [
    "a",
    "b",
    "C",
    "D"
  ]

  constructor() { }

  ngOnInit(): void {
    
  }
  mudarSelect(e:any){
    e.target.value = "Visualização"
    // console.log(e.target.name)
    console.log(this.select);
    console.log(this.selectedVisualizacao)
    this.select = this.selectedVisualizacao
    this.selectedVisualizacao = "Visualização"
    // if(!(this.select == this.selectedVisualizacao)){
    //     this.select = this.selectedVisualizacao
    // }

  }

}
