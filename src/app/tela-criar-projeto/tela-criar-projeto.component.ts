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
    this.usuarios = await this.service.getAllSomething('user')
    console.log(this.projeto);
    
  }
  
  messages: Message[] | undefined;
  projeto!:Project
  usuarios!: User[]

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
    if(event.target.contains(this.statusClose.nativeElement) || event.target.classList.contains("membros")){
      this.statusVisible = false
    }
  }

  @ViewChild('nome') nome!:ElementRef
  @ViewChild('data') data!:ElementRef
  @ViewChild('descricao') descricao!:ElementRef
  async salvarProjeto(){
    this.projeto.name = this.nome.nativeElement.value
    this.projeto.finalDate = this.data.nativeElement.value
    this.projeto.description = this.descricao.nativeElement.value
    await this.service.putProjeto(this.projeto);
    this.route.navigate(['tela-projeto'])
  }

   async cancelar(){
    localStorage.removeItem('projeto')
      this.service.deleteById('project', this.projeto.id)
      this.route.navigate(['/tela-projeto'])
   }

   async createStatus(event:any){
    this.projeto.statusList.push(event)
    this.projeto = await this.service.putProjeto(this.projeto)
   }

   ngOnDestroy(){
    console.log("dawdawda");
    
   }

   statusVisible = false

}
