import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Message } from 'primeng/api';
import { Status } from 'src/model/status';
import { DomSanitizer } from '@angular/platform-browser';
import { Team } from 'src/model/team';
import { UserProject } from 'src/model/userProject';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from 'src/service/cookies-service.service';
import { LogarithmicScale } from 'chart.js';
import { Role } from 'src/model/Role';

@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {
  imagemBlob: any;
  preImage: any;
  formData: any;

  loggedUser !: User;
  constructor(private service : BackendEVOLVEService, private route: Router, private sanitizer: DomSanitizer,private activatedRoute: ActivatedRoute, private cookieService: CookiesService){}
  
  async ngOnInit(){
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})

    this.projeto = new Project

    this.activatedRoute.paramMap.subscribe( async params  => {
      const teamId = params.get('teamId');
      const teamid  = Number(teamId)


      this.team = this.loggedUser.teamRoles.find(team => team.team.id === teamid)?.team as Team;
      
      this.usuarios = this.team.participants.map(userTeam => userTeam.user) || []
      
      this.projeto = new Project();

    // Chame getStatusList() aqui dentro
      if (this.projeto) {
        this.getStatusList();
        this.randomColor();
      }
    });
    
  }
  
  messages: Message[] | undefined;
  projeto!:Project
  usuarios : User[] = []
  saveProject : Boolean = false
  date !: Date
  searchTerm : string = ''
  priorityBol : boolean = false
  backGroundColorProject : string = ''
  team !: Team

  statusEnabled(){
    this.statusVisible = !this.statusVisible
  }

  isContrastSufficient(textColor: string, backgroundColor: string, threshold: number = 4.5): boolean {
    const luminance = (color: string) => {
        const rgb = color.substr(1); // Remover o '#' do início da string
        const [r, g, b] = rgb.match(/.{2}/g)!.map(hex => parseInt(hex, 16) / 255); // Converter cada par de caracteres hexadecimais em um número e normalizar
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const contrastRatio = (luminance(textColor) + 0.05) / (luminance(backgroundColor) + 0.05);

    return contrastRatio >= threshold;
  }

  getStatusList(){
    const lang = localStorage.getItem('lang') ?? 'en'; // Assume 'en' como padrão se o localStorage estiver vazio
    const translations : any = {
      "pendente": {
        "en": "pending",
        "pt": "pendente",
        "es": "pendiente",
        "ch": "待定"
      },
      "em progresso": {
        "en": "in progress",
        "pt": "em progresso",
        "es": "en progreso",
        "ch": "进展中"
      },
      "concluido": {
        "en": "completed",
        "pt": "concluido",
        "es": "completado",
        "ch": "已完成"
      },
      "não atribuido": {
        "en": "unassigned",
        "pt": "não atribuido",
        "es": "no asignado",
        "ch": "未分配"
      }
    };
  
    this.projeto.statusList = [
      {
        id :  0,
        name : translations["pendente"][lang],
        backgroundColor: "#7CD5F4",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 
  
      },
      {
        id :  0,
        name : translations["em progresso"][lang],
        backgroundColor: "#FCEC62",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 
  
      },
      {
        id :  0,
        name : translations["concluido"][lang],
        backgroundColor: "#86C19F",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 
  
      },
      {
        id :  0,
        name : translations["não atribuido"][lang],
        backgroundColor: "#9CA3AE",
        textColor: "#000000",
        enabled:  true,
        columnIndex :  0 
  
      }
    ];
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
    return this.usuarios.filter(element => element.email?.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  }

  dateFormat(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    return `${ano}-${mes}-${dia}`;
  }

  
  async salvarProjeto(teamId: number) {
    if (this.projeto && this.projeto.name !== '' && this.date) {
      this.projeto.finalDate = this.dateFormat(this.date);
      let loggedUser:User = await this.cookieService.getLoggedUser()
  
      let postProject: any = this.projeto;
      
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          postProject.creator = { "id": loggedUser.id };
          // postProject.adimnistrator = { "id": 1 };
          postProject.team = { "id": this.team.id };
          postProject.imageColor = this.backGroundColorProject;
          postProject.image = null;
          postProject.statusList = this.projeto.statusList;
  
          resolve();
        });
      });
      
      postProject = await this.service.postProjeto(postProject, postProject.team.id);

      setTimeout(async () => {
        if(postProject.id != null){
          
          let lista: Array<any> = [];
            setTimeout(() => {
              this.projeto.members.forEach(element => {
                lista.push(
                  {
                    "userId" : element.userId,
                    "projectId" : postProject.id,
                    "role" : element.role,
                    "user" : element.userId,
                    "project" : postProject.id,
                    "manager" : false
                  }
                );
              });
            });
            setTimeout(async () => {
              await this.service.patchProjectMembers(postProject.id, lista)
            });
        }
  
    
        if (this.formData != null) {
          await this.service.patchProjectImage(postProject.id, this.formData);
        }
    
        setTimeout(() => {
          this.route.navigate(['/tela-tarefa', postProject.id]);
        });
      });
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

   async cancelar(teamId:number){
      this.route.navigate(['/tela-projeto', teamId])
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
