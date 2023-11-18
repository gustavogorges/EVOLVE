import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {


  listaTarefas: Array<Tarefa> = []

  booleanTask:boolean = false;

  constructor(private service: BackendEVOLVEService) {}

    async ngOnInit(): Promise<void> {
    this.listaTarefas = await this.service.getAllSomething("tarefa")
  }

  mostrar(){
    console.log(this.listaTarefas)
  }
tarefaSelecionada:Tarefa = new Tarefa
  openTask(tarefa:Tarefa) :void {
    this.booleanTask = !this.booleanTask;
    this.tarefaSelecionada = tarefa;
  }

}
