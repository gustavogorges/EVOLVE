import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-tarefa',
  templateUrl: './tela-tarefa.component.html',
  styleUrls: ['./tela-tarefa.component.scss']
})
export class TelaTarefaComponent implements OnInit {
  selectedVisualizacao = "Visualização";
  select : string = "Padrao";
  listaTarefas: Array<Tarefa> =[]
  listOptions :Array<string>=[]
  visualizacaoVIsivel:boolean = false

  option :string=""

  constructor(private service : BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.listaTarefas =await this.service.getAllSomething("tarefa")
    console.log(this.listaTarefas)
  }

  changeVisualizacao(e:any){
    e.target.value = "Visualização"
  
    this.select = this.selectedVisualizacao
    this.selectedVisualizacao = "Visualização"
    this.select = this.selectedVisualizacao
    this.selectedVisualizacao = "Visualização"
    this.listOptions = [
      "Visulaização","Padrão","Kanban","Lista","Calendario"
    ]
    this.visualizacaoVIsivel=true;
    console.log(this.option)

    
  }
  editOption(){


  }
  


}
