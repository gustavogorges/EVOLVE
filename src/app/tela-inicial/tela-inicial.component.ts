import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/model/equipe';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {


  listaTarefas: Array<Tarefa> = []
  listaEquipes: Array<Equipe> = []
   
  booleanTask:boolean = false;

  constructor(private service: BackendEVOLVEService) {}

    async ngOnInit(): Promise<void> {
      this.listaTarefas = await this.service.getAllSomething("tarefa")
      this.listaEquipes = await this.service.getAllSomething("equipe")
      console.log(this.listaEquipes)
  }

  openTask(tarefa:Tarefa) :void {
    this.booleanTask = !this.booleanTask;
  }

}
