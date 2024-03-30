import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})
export class TelaPerfilComponent implements OnInit {
  constructor(
    private cookieService: CookiesService,
    private service: BackendEVOLVEService,
    private location: Location
  ) {}

  @Input()
  user!: User;
  loggedUser!: User;
  teamUsers!: Array<any>;
  teamShowing!: Team;

  data: any;

  async ngOnInit(): Promise<void> {
    this.data = this.location.getState();
    let userData: User = await this.data.user;
    if (userData != null) {
      this.user = userData;
    } else {
      this.loggedUser = await this.cookieService
        .getLoggedUser()
        .then((user) => {
          return user;
        });
      this.user = this.loggedUser;
    }

    console.log(this.loggedUser);

    // Converte o conjunto de usuários únicos de volta para um array
    await this.teste();
    console.log(this.teamUsers);

    this.changeTeam(this.user.teams[0]);
    console.log(this.teamShowing);

    // Inicializa um conjunto para armazenar usuários únicos
    const uniqueUsers = new Map<number, any>();

    // Itera sobre cada equipe e adiciona os participantes ao conjunto
  }
  async teste() {
    this.user.teams = await this.service.getTeamsByUserId(this.user.id);
    let users: any = [];
    this.user.teams.forEach((team) => {
      users = team.participants.filter(
        (participant) =>
          participant.id != this.user.id && !users.includes(participant)
      );
    });
    this.teamUsers = users;
  }

  abu() {
    console.log('kdsjflah fjklsdh flk');
  }
  getUserStyles(user: any): any {
    let styles: any = {};
    console.log(user);

    if (user.image != null) {
      styles['background'] = user.image.data;
    }
    styles['background-color'] = user.imageColor;

    return styles;
  }
  changeTeam(team: Team) {
    console.log(team);

    this.teamShowing = team;
  }
}
