import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-tarefa',
  templateUrl: './tela-tarefa.component.html',
  styleUrls: ['./tela-tarefa.component.scss']
  // 
})
export class TelaTarefaComponent implements OnInit {
  selectedVisualizacao = "Visualização";
  select : string = "Padrao";
  listaTarefas: Array<Tarefa> =[]
  booleanTask : boolean = false;


  constructor(private service : BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.listaTarefas =await this.service.getAllSomething("tarefa")
    console.log(this.listaTarefas)
    
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

  adicionarTarefa() {
    this.booleanTask = !this.booleanTask;
  }

}
