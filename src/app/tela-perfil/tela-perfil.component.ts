import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})
export class TelaPerfilComponent implements OnInit {
  constructor(
    private cookieService: CookiesService,
    private service: BackendEVOLVEService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  @Input()
  user!: User;
  loggedUser!: User;
  teamUsers!: Array<any>;
  teamShowing!: Team;

  data: any;
  userData !:User|null
  logged = false
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe( async params  => {
      // Obtém o parâmetro do projeto da rota
      const projectId = params.get('userId');
      const id  = Number(projectId)
      this.user = await this.service.getOne('user', id);
      console.log(this.user);
      this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
      if(this.loggedUser.id!=this.user.id){
        this.logged=false
      }else{
        this.logged=true;
      }
      await this.teste()

      this.changeTeam(this.user?.teams[0]);

    });
    

  }
  async teste() {
    this.user.teams = await this.service.getTeamsByUserId(this.user?.id);
    console.log(this.user.teams);
    
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
  sendEmail(){
    const destinatario = this.user.email;
    const assunto = '';
    const corpo = '';
  
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destinatario)}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  
    window.open(gmailLink, '_blank');
  }
  goToChat(){
    this.router.navigate(['/tela-chat']);

  }
}
