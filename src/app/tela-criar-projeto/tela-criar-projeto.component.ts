import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Message } from 'primeng/api';
import { Status } from 'src/model/status';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {
  imagemBlob: any;
  preImage: any;
  formData: any;

  constructor(private service : BackendEVOLVEService, private route: Router, private sanitizer: DomSanitizer){}
  
  async ngOnInit(){
    this.projeto = new Project
    this.usuarios = await this.service.getAllSomething('user') || []
    this.getStatusList()
    this.randomColor()
  }
  
  messages: Message[] | undefined;
  projeto!:Project
  usuarios : User[] = []
  saveProject : Boolean = false
  date !: Date
  searchTerm : string = ''
  priorityBol : boolean = false
  backGroundColorProject : string = ''

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
      postProject.imageColor = this.backGroundColorProject
      postProject = await this.service.postProjeto(postProject);
      if(this.formData != null){
        console.log(await this.service.patchImage(postProject.id, this.formData));
      }
      
      this.route.navigate(['/tela-projeto'])
    }
  }

  async setImageProject(event:any){
    if(event.target.files && event.target.files[0]){
      if(event.target.files[0].type === "image/jpeg" 
      || event.target.files[0].type === "image/webp" 
      || event.target.files[0].type === "image/png"){
        this.imagemBlob = event.target.files[0]
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        this.formData = formData;
        const blob = new Blob([event.target.files[0]], { type: event.target.files[0].type });

        const imageUrl = URL.createObjectURL(blob);
        this.preImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      }
    }
  }

  

  randomColor(){
    this.backGroundColorProject = '#' + Math.floor(Math.random()*16777215).toString(16);
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

   verifyDarkTheme(){
    let sla = localStorage.getItem('theme')
    if(sla === 'dark'){
      return true
    }else{
      return false
    }
   }

}
