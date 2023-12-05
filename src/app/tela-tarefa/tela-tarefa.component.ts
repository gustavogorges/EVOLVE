import { Component, HostListener, Input, OnInit } from '@angular/core';
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

  tarefaSelecionada:Tarefa = new Tarefa
  tarefaNova : Tarefa = new Tarefa;


  constructor(private service : BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.listaTarefas =await this.service.getAllSomething("tarefa")
    console.log(this.listaTarefas)
    
  }

  @HostListener('click', ['$event'])
  clicouFora(event:any){
   const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c77') ||
    name.includes('c72') ||
    name.includes('c64') ||
    name.includes('c70') || 
    name.includes('c78') ||
    name.includes('c71') ||
    name.includes('c79'));
     if(!element){
       for(let pFor of this.listaTarefas){
           this.closeTask();
       }
     }
  }

  closeTask() {
    this.tarefaNova = new Tarefa;
    this.booleanTask = false;
  }

  mudarSelect(e:any){
    e.target.value = "Visualização"
    // console.log(e.target.name)
    this.select = this.selectedVisualizacao
    this.selectedVisualizacao = "Visualização"
    // if(!(this.select == this.selectedVisualizacao)){
    //     this.select = this.selectedVisualizacao
    // }

  }

  openTask(tarefa:Tarefa) :void {
    this.booleanTask = !this.booleanTask;

    this.tarefaSelecionada = tarefa;

  }

  openTaskEdit() {
    this.tarefaSelecionada = this.tarefaNova;
    this.booleanTask = true;
  }

  adicionarTarefa() {
    this.tarefaSelecionada.id = 0;
    this.booleanTask = !this.booleanTask;
  }

}
