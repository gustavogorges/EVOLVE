import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-projeto-remastered',
  templateUrl: './tela-projeto-remastered.component.html',
  styleUrls: ['./tela-projeto-remastered.component.scss']
})
export class TelaProjetoRemasteredComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route:Router, private activatedRoute : ActivatedRoute) { }

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
  ngOnInit(): void {
    this.getProjects()
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
      this.projects = await this.service.getProjectsByTeamId(this.teamId)
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
    console.log(project)
    let listUsers : Array<Pick<User, "id">> = new Array
    
    setTimeout(() => {
      // project.members.forEach(element => {
      //   listUsers.push({
      //     "id" : element.user.id
      //   })
      // });
      postProject.members = project.members
      postProject.image = null
    },);

    setTimeout(async () => {

      if(this.listFromRemove.length != 0){
        project.members.filter(member => !this.listFromRemove.includes(member))
        await this.service.patchProjectMembers(project.id, project.members)
        // await this.service.deleteUserFromProject(project.id, this.listFromRemove)
      }

      if(this.formData!=null){
        await this.createImageProject(project)
      } 

      await this.service.putProjeto(project)  //não se é usado mais o put (talvez criar um metoo put que faca todos os patches dentro dele)
    
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
    if(p.image){
      return await this.service.patchProjectImage(p.id, p.image)
    }
    // return await this.service.patchProjectImage(p.id, this.formData)
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
