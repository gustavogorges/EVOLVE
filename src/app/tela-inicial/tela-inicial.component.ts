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
   
    this.loggedUser.teamRoles = await this.service.getTeamsByUserId(this.loggedUser.id)
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
    this.changeFont()

  }


  changeFont(){
    document.documentElement.style.setProperty('--font-size-base', ''+this.loggedUser.fontSize+'px');
    document.documentElement.style.setProperty('--font-size-sm', ''+(this.loggedUser.fontSize-2)+'px');
    document.documentElement.style.setProperty('--font-size-lg', ''+(this.loggedUser.fontSize+2)+'px');
    document.documentElement.style.setProperty('--font-size-xl', ''+(this.loggedUser.fontSize+4)+'px');
    document.documentElement.style.setProperty('--font-size-2xl', ''+(this.loggedUser.fontSize+8)+'px');
    document.documentElement.style.setProperty('--font-size-3xl', ''+(this.loggedUser.fontSize+14)+'px');
  
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
  projeto :Project = new Project()
  id =0
async openTask(tarefa: Task): Promise<void> {
    this.booleanTask = true;

    this.tarefaSelecionada = tarefa;
    if(this.tarefaSelecionada.project.id!=undefined){
       this.projeto = await this.service.getOne("project", this.tarefaSelecionada.project.id)

    }
  }

 
  indiceAtual: number = 0;

  mudarItem(novoIndice: number) {
    console.log(novoIndice);

    
    
    if (novoIndice >= 0 && novoIndice < this.loggedUser.teamRoles.length) {
      this.indiceAtual = novoIndice;
    }
    if(novoIndice>=this.loggedUser.teamRoles.length){
      this.indiceAtual= 0 
    }
    if(novoIndice==-1){
      this.indiceAtual= this.loggedUser.teamRoles.length-1
    }
  }

  getCurrentTeam(indiceAtual:number):Team{
    if(this.loggedUser.teamRoles.length - 1 >= indiceAtual) {
      return this.loggedUser.teamRoles[indiceAtual].team 
    }
    return new Team();

  }

  goToPerfilPage(){
    
  }
  goTasks(projectId : number){
    this.router.navigate(['/tela-tarefa/'+projectId]);

  }
  goProjetos(){
    this.router.navigate(["/tela-projeto"])
  }
  
  tarefaNova: Task = new Task();
  closeTask(event: boolean) {
    if (event) {
      this.tarefaNova = new Task();
      this.booleanTask = false;
    }
  }
}
