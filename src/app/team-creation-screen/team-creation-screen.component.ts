import { Component, OnInit } from '@angular/core';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-team-creation-screen',
  templateUrl: './team-creation-screen.component.html',
  styleUrls: ['./team-creation-screen.component.scss']
})
export class TeamCreationScreenComponent implements OnInit {

  isSearchUserModalOpen:boolean=false

  teamParticipants:Array<User> = new Array

  team!:Team


  constructor(private service:BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.team = new Team
    // this.team = await this.service.postEquipe(this.team)
    // this.team.imageColor = "#05ff9e"
  }


  setSearchUserModal(){
    this.isSearchUserModalOpen = !this.isSearchUserModalOpen
  }

  addUsers(users:Array<User>){
    users.forEach(user => this.teamParticipants.push(user))
    this.isSearchUserModalOpen=false
  }

}
