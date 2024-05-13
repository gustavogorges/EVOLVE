import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LogarithmicScale } from 'chart.js';
import { TEXT_ALIGN } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import {v4 as uuidv4} from 'uuid'; 
@Component({
  selector: 'app-team-creation-screen',
  templateUrl: './team-creation-screen.component.html',
  styleUrls: ['./team-creation-screen.component.scss']
})
export class TeamCreationScreenComponent implements OnInit {

  isSearchUserModalOpen:boolean=false
  backGroundColorProject : String = ''

  @ViewChild("teamNameInput") teamNameInput!:any;

  teamParticipants:Array<User> = new Array

  team!:Team
  isEditingTeamName:boolean=false
  disabledInfo = true 
  name = ""
select = false 
  constructor(
    private service:BackendEVOLVEService,
    private cookiesService:CookiesService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,

    ) { }
id ! :number
loggedUser !: User
  async ngOnInit(): Promise<void> {
    console.log(1243);
   this.loggedUser =  await this.cookiesService.getLoggedUser();
    
    this.route.paramMap.subscribe( async params  => {
      // Obtém o parâmetro do projeto da rota
      const projectId = params.get('teamId');
      console.log(projectId);
      
      this.id  = Number(projectId)
    
    });
    console.log(this.id);

    
    if(this.id ==0){
      this.disabledInfo = false
      this.team = new Team
      this.team.name = "nome da sua equipe"
      this.randomColor()
      this.disabledInfo = false
    }else{
      this.team = await this.service.getOne('team', this.id);
      this.disabledInfo = true
      this.backGroundColorProject = this.team.imageColor
      this.team.participants.map((u)=>this.teamParticipants.push(u))

    }
    this.team.code = uuidv4()

    console.log(this.loggedUser);
    
    console.log(this.team);
    
    
  }
  IconsOptionsSelect: Array<string> =[];

  imagemBlob: any;
  preImage: any;
  formData: any;
  async setImage(event:any){
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
        console.log(this.preImage);
       
  
        
       // await this.service.patch(this.user.id, this.formData)   
      //  this.user = await this.service.getOne("user",this.user.id)   
      }
    }
  }
  options = ["Administrador", "Membro", "Visualizador"]
  openSelect(){
    this.select = !this.select
  }

  randomColor(){
    this.backGroundColorProject = '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  // async createNewTeam():Promise<Team>{
  //   let team = new Team
  //   team.adimnistrator = await this.cookiesService.getLoggedUser()
  //   return await this.service.postEquipe(team)
  // }


  // editTeamName(){
  //   this.isEditingTeamName = true
  //   this.teamNameInput.nativeElement.disabled = false
  //   console.log(this.teamNameInput);
  //   this.teamNameInput.nativeElement.focus()
  // }

  // async saveTeamName():Promise<void>{
  //   this.isEditingTeamName = false
  //   this.team = await this.service.patchTeamName(this.team.id, this.team.name)
  //   this.teamNameInput.nativeElement.disabled = true
  // }

  // cancelEditingTeamName(){
  //   this.isEditingTeamName = false
  //   this.teamNameInput.nativeElement.disabled = true
  // }




  setSearchUserModal(){
    this.isSearchUserModalOpen = !this.isSearchUserModalOpen
  }

  addUsers(users:Array<User>){
    users.forEach(user =>{
      if(!this.teamParticipants.includes(user)){
        this.teamParticipants.push(user)
      }
    }
    
       )
    console.log(this.teamParticipants);
    
    this.isSearchUserModalOpen=false
  }
  removeUser(indice : number){
    this.teamParticipants.splice(indice, 1)
  }
 async  salvar(){
  this.team.name = this.name;
    this.teamParticipants.map((u)=>{
      this.team.participants.push(u); 
    })
    this.team.imageColor = this.backGroundColorProject

  if(this.id==0){

    
    this.team.adimnistrator = await this.cookiesService.getLoggedUser();
  console.log(this.team);
  
  
    this.service.postEquipe(this.team);
  }else{
this.service.putEquipe(this.team); 
  }
  }
  editar(){
    this.disabledInfo = false;
  }
  leaveTeam(){
    
  }
  removeTeam(){
    this.service.deleteById("team",this.team.id);
  }
  cancelar(){
    console.log(this.disabledInfo);
     
    this.disabledInfo = true;
  
    if(this.id ==0){
      this.router.navigateByUrl('/tela-inicial');
    }
  }

}