import { Component, OnInit } from '@angular/core';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { UserTeam } from 'src/model/userTeam';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-enter-team-modal',
  templateUrl: './enter-team-modal.component.html',
  styleUrls: ['./enter-team-modal.component.scss']
})
export class EnterTeamModalComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private cookie : CookiesService) { }
  code !: string;
  loggedUser !: User
  async ngOnInit(): Promise<void> {
    console.log('to aqui em ');
    this.loggedUser = await this.cookie.getLoggedUser()
    
  }
team !: Team
  async verifyCode(){
    
    console.log(this.code);
    this.team = await this.service.getTeamsByCode(this.code)
    console.log(this.team);
    this.enterTeam()
    
  }

  async enterTeam(){
    let userTeam = new UserTeam();
    // userTeam.team = this.team
    userTeam.teamId = this.team.id;
    userTeam.user = this.loggedUser
    userTeam.userId = this.loggedUser.id;
    this.team.participants.push(userTeam);

    console.log(this.team.participants);
    await this.service.patchTeamParticipants(this.team.id, this.team.participants);
    
  }
}
