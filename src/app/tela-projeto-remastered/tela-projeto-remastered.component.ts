import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-tela-projeto-remastered',
  templateUrl: './tela-projeto-remastered.component.html',
  styleUrls: ['./tela-projeto-remastered.component.scss']
})
export class TelaProjetoRemasteredComponent implements OnInit {
  
  booleanTask = false

  constructor(private service : BackendEVOLVEService, private route:Router, private activatedRoute : ActivatedRoute, private cookies_service : CookiesService) { }

  id!: number
  projects !: Project[]
  resetProject: Boolean = false
  formData!:FormData
  response !: boolean | undefined
  quest !: string
  confirmationActionModalBol : boolean = false
  listFromRemove = new Array
  teamId : number = 0
  team !: Team
  task !: Task
  project !: Project;


  loggedUser : User = new User;
  async ngOnInit() {
    this.loggedUser = await this.cookies_service.getLoggedUser();
    this.getProjects()
  }

  closeTask(event: boolean) {
    if (event) {
      this.booleanTask = false;
    }
  }

  openTaskModal(task:any){
    this.task = task
    this.project = task.project as Project
    this.booleanTask = true
  }

  getResponse(){
    return this.response
  }

  setResponse(event:any){
    this.response = event
    this.confirmationActionModalBol = false
  }

  setQuest(event:any){
    this.quest = event
    this.response = undefined
    this.confirmationActionModalBol = true
  }

  ngOnChange(): void {
    this.getProjects()
  }

  resetProjectOff(){
    this.resetProject = false
  }

  async getProjects(){
    this.activatedRoute.paramMap.subscribe( async params  => {
      const getTeamId = params.get('teamId');
      this.teamId  = Number(getTeamId)
      this.team = await this.service.getOne("team", this.teamId)
      this.projects = await this.service.getProjectsByTeamId(this.teamId, 1)
      console.log(this.projects);
    });
  }

  openProject(p:any){
        this.projects.forEach(element => {
          if(element.id != p.id){
            element.isVisible = false
            element.editOn = false
          }
        });
        if(!p.editOn){
          p.isVisible = !p.isVisible
        }
  }

  @ViewChild('projectElement') projectElement!:ElementRef
  @HostListener('click', ['$event'])
  clickOutside(event:any){
    if(this.projectElement){
      if(event.target.contains(this.projectElement.nativeElement)){
        this.projects.forEach(element => {
          if(element.editOn){
            this.resetProject = true
          }
          element.editOn = false
          element.isVisible = false
        });
      }
    }
  }

  setListFromRemove(event:any){
    this.listFromRemove = event
  }

  noCloseProject(project:any){
    this.openProject(project)
  }

  async delete(id:number){
    this.projects.forEach((e) =>{
      if(e.id == id){
        this.projects.splice(this.projects.indexOf(e),1)
      }
    })
    await this.service.deleteById("project",id);
  }

  

   async editFun(project:Project){
    let postProject:any = project
    let listUsers : Array<Pick<User, "id">> = new Array
    
    setTimeout(() => {
      project.members.forEach(element => {
        listUsers.push({
          "id" : element.id
        })
      });
      postProject.members = listUsers
      postProject.image = null
    },);

    setTimeout(async () => {
      await this.service.putProjeto(postProject, this.loggedUser.id)
    
      if(this.listFromRemove.length != 0){
        await this.service.deleteUserFromProject(project.id,this.loggedUser.id, this.listFromRemove)
      }

      if(this.formData!=null){
        await this.createImageProject(project)
      } 
    });

    setTimeout(async () => {
      project = await this.service.getOne("project", project.id)
    })

    setTimeout(() => {
      postProject.image = project.image
      postProject.members = project.members
      postProject.editOn = false
    })
  }

  async createImageProject(p:Project){
    return await this.service.patchImage(p.id, this.formData)
  }

  async saveImage(event:any){
    this.formData = event
  }

  async goToCreateProject(teamId : number){
    this.route.navigate(['/criar-projeto', teamId])
  }

  editProject(event:any, p:any){
    this.projects.forEach(element => {
      if(element.id === p.id){
        element.editOn = event
      }
    });
  }
  

  closeModal(): void {
    this.confirmationActionModalBol = false;
    // Reagendar a contagem regressiva
    if (this.quest) {
      this.setQuest(this.quest);
    }
  }
}
