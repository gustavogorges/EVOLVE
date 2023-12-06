import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Equipe } from 'src/model/equipe';
import { Tarefa } from 'src/model/tarefa';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss'],
})
export class TelaInicialComponent implements OnInit {
  @HostListener('click', ['$event'])
  clicouFora(event: any) {
    console.log('TESTE 2');
    const element = event.target
      .getAttributeNames()
      .find((name: string | string[]) => name.includes('c60'));
    if (!element) {
      for (let pFor of this.listaTarefas) {
        this.booleanTask = false;
      }
    }
  }

  listaTarefas: Array<Tarefa> = [];

  data: any;

  loggedUser: Usuario = new Usuario;

  booleanTask: boolean = false;

  constructor(
    private service: BackendEVOLVEService,
    private location: Location,
    private cookieService: CookiesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.data = this.location.getState();
    let userData: Usuario = await this.data.user
    if(userData){
      this.cookieService.setOne( userData)
    }
     
    //this.loggedUser = await this.data.user;

    //this.cookieService.setOne(this.loggedUser)

    this.listaTarefas = await this.service.getAllSomething('tarefa');
    
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
  }
  tarefaSelecionada: Tarefa = new Tarefa();
  openTask(tarefa: Tarefa): void {
    console.log('teste 1');
    this.booleanTask = true;

    this.tarefaSelecionada = tarefa;
  }

  closeTask(tarefa: Tarefa) {
    this.booleanTask = false;
    this.tarefaSelecionada = new Tarefa();
  }
}
