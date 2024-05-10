import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LogarithmicScale } from 'chart.js';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-team-creation-screen',
  templateUrl: './team-creation-screen.component.html',
  styleUrls: ['./team-creation-screen.component.scss']
})
export class TeamCreationScreenComponent implements OnInit {

  isSearchUserModalOpen:boolean=false

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
    private sanitizer: DomSanitizer

    ) { }

  async ngOnInit(): Promise<void> {
    this.team = await this.service.getOne("team", 6);
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




  // setSearchUserModal(){
  //   this.isSearchUserModalOpen = !this.isSearchUserModalOpen
  // }

  // addUsers(users:Array<User>){
  //   users.forEach(user => this.teamParticipants.push(user))
  //   this.isSearchUserModalOpen=false
  // }

}