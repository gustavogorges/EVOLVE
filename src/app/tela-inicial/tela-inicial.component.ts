import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Team } from 'src/model/team';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { Project } from 'src/model/project';
import { ColorService } from 'src/service/colorService';
import { LogarithmicScale } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss'],
})
export class TelaInicialComponent implements OnInit {
  @HostListener('click', ['$event'])
  clicouFora(event: any) {
    const element = event.target
      .getAttributeNames()
      .find((name: string | string[]) => name.includes('c60'));
    if (!element) {
      for (let pFor of this.listaTarefas) {
        this.booleanTask = false;
      }
    }
  }

  listaTarefas: Array<Task> = [];

  data: any;

  loggedUser: User = new User;

  booleanTask: boolean = false;
  projectList : Array<Project> =[]

  constructor(
    private service: BackendEVOLVEService,
    private location: Location,
    private cookieService: CookiesService, 
    private colorService : ColorService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.data = this.location.getState();
    let userData: User = await this.data.user
    if(userData){
      this.cookieService.setLoggedUserId( userData)
    }
     
  

    
    
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    this.listaTarefas = await this.service.getTasksByUserId(this.loggedUser.id)
     this.listaTarefas.sort((a,b)=>{
          if (a.finalDate < b.finalDate) {
            return -1; // 'a' vem antes de 'b'
          } else if (a.finalDate > b.finalDate) {
            return 1; // 'b' vem antes de 'a'
          } else {
            return 0; // datas são iguais
          }
        })
   let projects = await this.service.getProjectsByUserId(this.loggedUser.id)
   
   this.loggedUser.teams = await this.service.getTeamsByUserId(this.loggedUser.id)
    this.userColors()
 
   

   projects.map((project: Project)=>{
    if(project.favorited){
      this.projectList.push(project)
      
    }
   })
   if(this.loggedUser.theme=="dark"){
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme','dark')
  }else{
    document.documentElement.classList.remove('dark')
    document.querySelector('.pi-sun')?.classList.add('pi-moon')
    document.querySelector('.pi-sun')?.classList.remove('pi-sun')
    localStorage.setItem('theme','light')

  }   
  

   
     
      

    

  }
  userColors(){
    console.log(this.loggedUser);
    
    if(this.loggedUser.primaryColor || this.loggedUser.secondaryColor){
      this.colorService.setPrimaryColor(this.loggedUser.primaryColor)
      this.colorService.setSecondaryColor(this.loggedUser.secondaryColor)
      this.colorService.setPrimaryDarkColor(this.loggedUser.primaryDarkColor)
      this.colorService.setSecondaryDarkColor(this.loggedUser.secondaryDarkColor)
    }else{

      this.colorService.setPrimaryDarkColor("#67BFE0")
      this.colorService.setSecondaryDarkColor("#86C19F")
      this.colorService.setPrimaryColor("#185E77")
      this.colorService.setSecondaryColor("#4C956C")
    }
   
  }
  tarefaSelecionada: Task = new Task();
  openTask(tarefa: Task): void {
    this.booleanTask = true;

    this.tarefaSelecionada = tarefa;
  }

  closeTask(tarefa: Task) {
    this.booleanTask = false;
    this.tarefaSelecionada = new Task();
  }
  indiceAtual: number = 0;

  mudarItem(novoIndice: number) {
    if (novoIndice >= 0 && novoIndice < this.listaTarefas.length) {
      this.indiceAtual = novoIndice;
    }
  }

  goToPerfilPage(){
    
  }
  goTasks(projectId : number){
    this.router.navigate(['/tela-tarefa/'+projectId]);

  }
}
