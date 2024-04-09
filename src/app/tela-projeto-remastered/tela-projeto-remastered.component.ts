import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-projeto-remastered',
  templateUrl: './tela-projeto-remastered.component.html',
  styleUrls: ['./tela-projeto-remastered.component.scss']
})
export class TelaProjetoRemasteredComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route:Router) { }

  id!: number
  projects !: Project[]
  resetProject: Boolean = false
  formData!:FormData

  ngOnInit(): void {
    this.getProjects()
  }

  ngOnChange(): void {
    this.getProjects()
  }

  resetProjectOff(){
    this.resetProject = false
  }

  async getProjects(){
    this.projects = await this.service.getAllSomething('project') || []
    
    this.projects = this.projects.reverse()
    console.log(this.projects);
    
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

  async editFun(p:Project){
    let postProject:any = p
    let listUsers : Array<Pick<User, "id">> = new Array
    p.members.forEach(element => {
      listUsers.push({
        "id" : element.id
      })
    });
    postProject.members = listUsers
    console.log(postProject.members);
    
    postProject.image = null
    p = await this.service.putProjeto(postProject)
    if(this.formData!=null){
      p = await this.createImageProject(p)
    }
    postProject.image = p.image
    postProject.members = p.members
    console.clear()
  }

  async createImageProject(p:Project){
    return await this.service.patchImage(p.id, this.formData)
  }

  async saveImage(event:any){
    this.formData = event
  }

  async goToCreateProject(){
    this.route.navigate(['/criar-projeto'])
  }

  editProject(event:any, p:any){
    this.projects.forEach(element => {
      if(element.id === p.id){
        element.editOn = event
      }
    });
  }


}

