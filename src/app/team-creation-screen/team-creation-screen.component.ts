import { Component, OnInit, ViewChild } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LogarithmicScale } from 'chart.js';
import { TEXT_ALIGN } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { UserTeam } from 'src/model/userTeam';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { v4 as uuidv4 } from 'uuid';
import { hasPermission } from '../shared/check-permissions';
import { Permission } from 'src/model/permission.';
@Component({
  selector: 'app-team-creation-screen',
  templateUrl: './team-creation-screen.component.html',
  styleUrls: ['./team-creation-screen.component.scss']
})
export class TeamCreationScreenComponent implements OnInit {

  isSearchUserModalOpen: boolean = false
  backGroundColorProject: String = ''

  @ViewChild("teamNameInput") teamNameInput!: any;

  teamParticipants: Array<UserTeam> = new Array
  options2 = ['Criador',"Administrador", "Colaborador", "Espectador"]
  options = ["Administrador", "Colaborador", "Espectador"]

  team!: Team
  isEditingTeamName: boolean = false
  disabledInfo = true
  name = ""
  select = false
  constructor(
    private service: BackendEVOLVEService,
    private cookiesService: CookiesService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,

  ) { }
  id !: number
  loggedUser !: User
  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookiesService.getLoggedUser();

    this.route.paramMap.subscribe(async params => {
      // Obtém o parâmetro do projeto da rota
      const projectId = params.get('teamId');

      this.id = Number(projectId)

    });


    if (this.id == 0) {
      this.disabledInfo = false
      this.team = new Team
      this.team.name = "nome da sua equipe"
      this.randomColor()
      this.team.code = uuidv4()
      this.disabledInfo = false
    } else {
      this.team = this.loggedUser.teamRoles.find(team => team.teamId === this.id)?.team!;
      this.disabledInfo = true
      this.backGroundColorProject = this.team.imageColor
      this.team.participants.map((u) => this.teamParticipants.push(u))

    }
    console.log(this.team);
  }

  getUsersFromTeam(userTeams: UserTeam[]): User[] {
    return userTeams.map(userTeam => userTeam.user)
  }

  IconsOptionsSelect = ['pi pi-shield', 'pi pi-wrench', 'pi pi-eye'];

  imagemBlob: any;
  preImage: any;
  formData: any;

  async setImage(event: any) {

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === "image/jpeg"
        || event.target.files[0].type === "image/webp"
        || event.target.files[0].type === "image/png") {
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
  permission(){
    
      return( hasPermission(this.loggedUser?.id, this.team, 'EDIT_TEAM_INFO' )
      );
        

   
  }

  userId = 0
    openSelect(id : number) {
      this.userId= id
    this.select = !this.select
  }
  choosenRole(option : string   , userTeam :UserTeam){  
    console.log(option);
    let index  = this.options2.indexOf(option)
    userTeam.role.id = index+1;
    console.log(index+1);
    
    console.log(userTeam);
    
  }

  randomColor() {
    this.backGroundColorProject = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  setSearchUserModal() {
    this.isSearchUserModalOpen = !this.isSearchUserModalOpen
  }

  addUsers(users: Array<User>) {
    
    users.forEach(user => {
      let userTeam: UserTeam = new UserTeam
      userTeam.user = user
      // userTeam.team = this.team
      userTeam.userId = user.id
      userTeam.teamId = this.team.id

      let addingUser:any = userTeam
      addingUser.role = {"id":3}

      if (!this.teamParticipants.map(userTeamD => userTeamD.user).includes(user)) {
        this.teamParticipants.push(addingUser)
      }
    }

    )
    console.log(this.teamParticipants);

    this.isSearchUserModalOpen = false
  }
  removeUser(indice: number) {
    this.teamParticipants.splice(indice, 1)
  }

  findTeamAdm(team: Team) {
    return team?.participants?.find(userTeam => userTeam.manager)?.user!
  }

  async salvar() {
    if (this.name != '') {
      this.team.name = this.name;
    }
    this.team.participants = this.teamParticipants

    this.team.imageColor = this.backGroundColorProject
    console.log(this.team);

    if (this.id == 0) {
      let userTeamCreator: any = new UserTeam
      userTeamCreator.manager = true
      // userTeamCreator.team = this.team
      userTeamCreator.user = this.loggedUser
      userTeamCreator.teamId = this.team.id
      userTeamCreator.userId = this.loggedUser.id

      let postUserTeamCreator = userTeamCreator
      postUserTeamCreator.role = {"id":1}

      this.team.participants.push(userTeamCreator)

      let postingTeam:any = this.team
      for(let a of postingTeam.participants){
        a.user = {"id": a.user.id}
      }

      console.log(postingTeam);
      console.log("postingTeam");
      
      this.team = await this.service.postEquipe(postingTeam);
    }

    else {
      let participantsPatch:any = this.team.participants
      for(let userTeam of participantsPatch){
        userTeam.user = {"id": userTeam.user.id}
      }
     await this.service.patchTeamName(this.team.id, this.team.name);
     await this.service.patchTeamImageColor(this.team.id, (this.team.imageColor as string))
      this.team = await this.service.patchTeamParticipants(this.team.id, participantsPatch)
      //this.service.putEquipe(this.team); 
    }
    this.disabledInfo = true;
    let id = this.team.id
    console.log(id);

    this.router.navigate(["/equipe/" + id])

  }
  editar() {
    this.disabledInfo = false;
  }
  openModal = false
  title = ''
  message = ''
  async leaveTeam() {
    this.title = 'sair da equipe'
    this.message = 'ao confirmar você perderá acesso a equipe'
    this.openModal = true
  }
  removeTeam() {
    this.title = 'excluir a equipe'
    this.message = 'ao confirmar a ação não poderá ser revertida'

    this.openModal = true

  }
  async modal(boolean: boolean) {
    if (boolean == false) {
      this.openModal = false;
    } else {
      console.log(this.title);
      console.log(this.title == 'sair da equipe');


      if (this.title == 'excluir a equipe') {
        console.log(10);

        this.service.deleteById("team", this.team.id);
        this.router.navigateByUrl('/tela-inicial');

      } else if (this.title == 'sair da equipe') {
        console.log(11);

        this.loggedUser = await this.cookiesService.getLoggedUser();
        const indexToRemove = this.team.participants.findIndex(userTeam => userTeam.userId === this.loggedUser.id);
        if (indexToRemove !== -1) {
          this.team.participants.splice(indexToRemove, 1);
        }
        this.service.patchTeamParticipants(this.team.id, this.team.participants);
        this.router.navigateByUrl('/tela-inicial');

      }
    }
  }
  cancelar() {
    console.log(this.disabledInfo);

    this.disabledInfo = true;

    if (this.id == 0) {
      this.router.navigateByUrl('/tela-inicial');
    }
  }

}