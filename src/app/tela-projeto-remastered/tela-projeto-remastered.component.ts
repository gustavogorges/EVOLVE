import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-projeto-remastered',
  templateUrl: './tela-projeto-remastered.component.html',
  styleUrls: ['./tela-projeto-remastered.component.scss']
})
export class TelaProjetoRemasteredComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route:Router) { }

  id!: number
  projetos !: Project[]

  ngOnInit(): void {
    this.funcao()
  }

  ngOnChange(): void {
    this.funcao()
  }

  async funcao(){
    this.projetos = await this.service.getAllSomething('project')

    this.projetos.forEach(element => {
      if(element.name === ''){
        this.deletarPai(element.id)        
      }
    });

    this.projetos = this.projetos.reverse()

    this.projetos.forEach(element => {
      if(element.name === ''){
        this.deletarPai(element.id)        
      }
    });
  }

  openProject(p:any){
        this.projetos.forEach(element => {
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
    if(event.target.contains(this.projectElement.nativeElement)){
      this.projetos.forEach(element => {
        element.editOn = false
        element.isVisible = false
      });
    }
  }

  noCloseProject(project:any){
    this.openProject(project)
  }

  async deletarPai(id:number){
    this.projetos.forEach((e) =>{
      if(e.id == id){
        this.projetos.splice(this.projetos.indexOf(e),1)
      }
    })
    await this.service.deleteById("project",id);
  }

  async salvarPai(p:Project){
   await this.service.putProjeto(p)
  }

  async goToCreateProject(){
    this.route.navigate(['/criar-projeto'])
  }

  editProject(event:any, p:any){
    this.projetos.forEach(element => {
      if(element.id === p.id){
        element.editOn = event
      }
    });
  }


}

