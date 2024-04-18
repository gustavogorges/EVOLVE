import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private service:BackendEVOLVEService,
    private cookiesService:CookiesService
    ) { }

  async ngOnInit(): Promise<void> {
    this.team = await this.createNewTeam()
    console.log(this.team);
    
  }

  async createNewTeam():Promise<Team>{
    let team = new Team
    team.administrator = await this.cookiesService.getLoggedUser()
    return await this.service.postEquipe(team.administrator.id)
  }


  editTeamName(){
    this.isEditingTeamName = true
    this.teamNameInput.nativeElement.disabled = false
    console.log(this.teamNameInput);
    this.teamNameInput.nativeElement.focus()
  }

  async saveTeamName():Promise<void>{
    this.isEditingTeamName = false
    this.team = await this.service.patchTeamName(this.team.id, this.team.name)
    this.teamNameInput.nativeElement.disabled = true
  }

  cancelEditingTeamName(){
    this.isEditingTeamName = false
    this.teamNameInput.nativeElement.disabled = true
  }




  setSearchUserModal(){
    this.isSearchUserModalOpen = !this.isSearchUserModalOpen
  }

  addUsers(users:Array<User>){
    users.forEach(user => this.teamParticipants.push(user))
    this.isSearchUserModalOpen=false
  }

}
