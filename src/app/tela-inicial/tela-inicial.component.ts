import { Component, HostListener, OnInit } from '@angular/core';
import { Equipe } from 'src/model/equipe';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  @HostListener('click', ['$event'])
   clicouFora(event:any){
    console.log("TESTE 2")
    const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c60'));
      if(!element){
        for(let pFor of this.listaTarefas){
            this.booleanTask = false;
        }
      }
   }

  listaTarefas: Array<Tarefa> = []
   
  booleanTask:boolean = false;

  constructor(private service: BackendEVOLVEService) {}

    async ngOnInit(): Promise<void> {
      this.listaTarefas = await this.service.getAllSomething("tarefa")
  }
tarefaSelecionada:Tarefa = new Tarefa
  openTask(tarefa:Tarefa) :void {
    console.log("teste 1")
    this.booleanTask = true;

    this.tarefaSelecionada = tarefa;
  }

  closeTask(tarefa:Tarefa) {
    this.booleanTask = false;
    this.tarefaSelecionada = new Tarefa;
  }

}
