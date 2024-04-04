import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Message } from 'primeng/api';
import { Status } from 'src/model/status';

@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route: Router){}
  
  async ngOnInit(){
    this.projeto = new Project
    this.usuarios = await this.service.getAllSomething('user') || []
    this.getStatusList()
  }
  
  messages: Message[] | undefined;
  projeto!:Project
  usuarios : User[] = []
  saveProject : Boolean = false
  date !: Date
  searchTerm : string = ''
  priorityBol : boolean = false

  statusEnabled(){
    this.statusVisible = !this.statusVisible
  }

  getStatusList(){
    this.projeto.statusList = [
      {
        id :  0,
        name : "pendente",
        backgroundColor: "#7CD5F4",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 

      },
      {
        id :  1,
        name : "em progresso",
        backgroundColor: "#FCEC62",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 

      },
      {
        id :  2,
        name : "concluido",
        backgroundColor: "#86C19F",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 

      },
      {
        id :  3,
        name : "não atribuido",
        backgroundColor: "#9CA3AE",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 

      }
    ]
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

  filteredNames() {
    return this.usuarios.filter(element => element.email.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
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
      let postProject:any = this.projeto
      let lista: Array<Pick<User, "id">> = new Array
      this.projeto.members.forEach(element => {
        lista.push({
          "id" : element.id
        })
      });
      postProject.members = lista
      postProject.creator = {
        "id":1
      }
      console.log(postProject.creator);
      
      await this.service.postProjeto(postProject);
      this.route.navigate(['/tela-projeto'])
    }
  }

   async cancelar(){
      this.route.navigate(['/tela-projeto'])
   }

   async createStatus(event:any){
    this.projeto.statusList.push(event)
   }

   priorityEnabled(){
    this.priorityBol = !this.priorityBol
   }

   statusVisible = false

}
