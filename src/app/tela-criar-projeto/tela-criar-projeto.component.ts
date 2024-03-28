import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route: Router){}
  
  async ngOnInit(){
    this.projeto = await this.service.postProjeto(new Project)
    this.usuarios = await this.service.getAllSomething('user') || []
  }
  
  messages: Message[] | undefined;
  projeto!:Project
  usuarios : User[] = []
  saveProject : Boolean = false
  date !: Date

  statusEnabled(){
    this.statusVisible = !this.statusVisible
  }

  editStatus(){
    
  }

  updateProject(p:Project){
    this.projeto.statusList = p.statusList
    this.service.putProjeto(p)
  }

  @ViewChild('statusClose') statusClose!:ElementRef
  @HostListener('click', ['$event'])
  clickOutside(event:any){
    if(this.statusClose){
      if(event.target.contains(this.statusClose.nativeElement) || event.target.classList.contains("membros")){
        this.statusVisible = false
      }
    }
  }

  dateFormat(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    return `${ano}-${mes}-${dia}`;
  }

  
  async salvarProjeto(){
    if(this.projeto.name != '' && this.date != null){
      this.projeto.finalDate = this.dateFormat(this.date);
      console.log(this.dateFormat(this.date));
      
      if(this.projeto.members === null){
        this.projeto.members = []
      }
      await this.service.putProjeto(this.projeto);
      this.saveProject = true
      this.route.navigate(['/tela-projeto'])
    }else{
      
    }
  }

   async cancelar(){
    this.saveProject = true
      await this.service.deleteById("project", this.projeto.id)
      this.route.navigate(['/tela-projeto'])
   }

   async createStatus(event:any){
    this.projeto.statusList.push(event)
    this.projeto = await this.service.putProjeto(this.projeto)
   }

   async ngOnDestroy(){
    if(!this.saveProject){
      await this.service.deleteById("project", this.projeto.id)
    }
   }

   statusVisible = false

}
