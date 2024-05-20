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
invalidCode = false
  async verifyCode(){
    
    console.log(this.code);
  let teamResponse = await this.service.getTeamsByCode(this.code);

    // Verificando o status e os dados da resposta
    if (teamResponse.status === 200) {
      this.team = teamResponse.data;
      this.enterTeam()
    } else {
      this.invalidCode  = true
      console.error('Erro na requisição:', teamResponse.status);
    }
    
  }

  async enterTeam(){
    let userTeam = new UserTeam();
    // userTeam.team = this.team
    userTeam.teamId = this.team.id;
    userTeam.user = this.loggedUser
    userTeam.userId = this.loggedUser.id;
    userTeam.team = this.team

    await this.service.patchTeamParticipantByCode(this.team.id, userTeam.userId);
    window.location.href = "equipe/"+this.team.id
  }
}
