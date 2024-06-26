import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { image } from 'html2canvas/dist/types/css/types/image';
import { File } from 'src/model/file';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { hasPermission } from '../shared/check-permissions';
import { PropertyWrite } from '@angular/compiler';

@Component({
  selector: 'app-tela-projeto-remastered',
  templateUrl: './tela-projeto-remastered.component.html',
  styleUrls: ['./tela-projeto-remastered.component.scss']
})
export class TelaProjetoRemasteredComponent implements OnInit {
  
  booleanTask = false

  constructor(private service : BackendEVOLVEService, private route:Router, private activatedRoute : ActivatedRoute, private cookies_service : CookiesService) { }

  id!: number
  name:string = "Oi luka sou undefined"
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
  filterBoolean = false
  ordenacaoBoolean = false
  atualFilter : any = null

  loggedUser : User = new User;
  async ngOnInit() {

    this.loggedUser = await this.cookies_service.getLoggedUser();
    await this.getProjects()
    this.getProjects()
    this.name = this.team.name
  }

  closeTask(event: boolean) {
    if (event) {
      this.booleanTask = false;
    }
  }

  async getFinalDateProjectFilter(event:any) {
    if(this.atualFilter != null){
      await this.getOriginal()
    }
    this.projects.sort((a, b) => {
        const dateA = new Date(a.finalDate);
        const dateB = new Date(b.finalDate);
        return dateA.getTime() - dateB.getTime();
    });

    this.atualFilter = {
      id: 0,
      name : event.target.innerText
    }
  }

  async getOriginal() {
    this.projects = await this.service.getProjectsByTeamId(this.teamId)

    this.projects.sort((a, b) => {
        const dateA = new Date(a.lastTimeEdited || a.creationDate);
        const dateB = new Date(b.lastTimeEdited || b.creationDate);

        return dateB.getTime() - dateA.getTime();
    });
  }

  async getProgress(event:any) {
    if(this.atualFilter != null){
      await this.getOriginal()
    }

    this.projects.sort((a, b) => {
        const dateA = new Date(a.progress);
        const dateB = new Date(b.progress);

        return dateB.getTime() - dateA.getTime();
    });
  }

  async sortProjectsByProgress(event:any){
    if(this.atualFilter != null){
      await this.getOriginal()
    }
    this.projects.sort((a, b) => b.progress - a.progress);
    this.atualFilter = {
      id: 4,
      name : event.target.innerText

    }
  }

  async getFavorites(event:any){
    if(this.atualFilter != null){
      await this.getOriginal()
    }

    const favoriteProjects = this.projects.filter(project => project.favorited);

    if (favoriteProjects.length > 0) {
        favoriteProjects.sort((a, b) => {
            const dateA = new Date(a.lastTimeEdited || a.creationDate);
            const dateB = new Date(b.lastTimeEdited || b.creationDate);
            return dateB.getTime() - dateA.getTime();
        });

        this.projects = favoriteProjects;
    } else {
        this.projects = [];
    }

    this.atualFilter = {
      id: 1,
      name : event.target.innerText

    }
  }

  async filterProjectsByLoggedUser(event:any){
    if(this.atualFilter != null){
      await this.getOriginal()
    }
    this.projects.filter(project => 
      project.members.some(member => member.userId === this.loggedUser.id)
    );

    this.atualFilter = {
      id: 2,
      name : event.target.innerText

    }
  }

  removeFilter(){
    this.atualFilter = null
      this.getOriginal()
  }

  hasPermission(team : Team){
   return  hasPermission(this.loggedUser.id, team, "CREATE_PROJECT")
  }

  openTaskModal(task:any){
    this.task = task
    this.project = task.project as Project
    this.booleanTask = true
  }

  filterBol(){
    this.filterBoolean = !this.filterBoolean
    this.ordenacaoBoolean = false
  }

  ordenacaoBol(){
    this.ordenacaoBoolean = !this.ordenacaoBoolean
    this.filterBoolean = false
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
      this.team = this.loggedUser.teamRoles.find(team => team.team.id === this.teamId)?.team as Team;
      this.getOriginal()
    });
  }

  changeFiltro(){

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
    setTimeout(async () => {
      if(this.formData!=null){
        await this.service.patchProjectImage(project.id, this.formData)
      }
    }, 50);

    setTimeout(async () => {
        await this.service.patchProjectDescription(project.id, project.description)
        await this.service.patchProjectName(project.id, project.name)
        await this.service.patchProjectFinalDate(project.id, project.finalDate)
      }, 50);
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
