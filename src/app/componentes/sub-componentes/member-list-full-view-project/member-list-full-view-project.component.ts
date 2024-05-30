import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogarithmicScale } from 'chart.js';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { UserProject } from 'src/model/userProject';
import { UserTeam } from 'src/model/userTeam';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-member-list-full-view-project',
  templateUrl: './member-list-full-view-project.component.html',
  styleUrls: ['./member-list-full-view-project.component.scss']
})
export class MemberListFullViewProjectComponent implements OnInit {

  constructor(private service : BackendEVOLVEService,
    private cookies_service : CookiesService
  ) { }

  loggedUser : User = new User;
  selectPermissions : boolean = false;
  options = ["Administrador", "Colaborador", "Espectador"];
  options2 = ['Criador',"Administrador", "Colaborador", "Espectador"];
  IconsOptionsSelect = ['pi pi-shield', 'pi pi-wrench', 'pi pi-eye'];
  userProject !: UserProject;
  loggedUserProject !: UserProject;
  hasPermission : boolean = false;

  async ngOnInit() {
    this.loggedUser = await this.cookies_service.getLoggedUser();
    this.userProject = this.project.members.find(userProject => userProject.user?.id == this.user?.id)!;
    this.loggedUserProject = this.project.members.find(userProject => userProject.user?.id == this.loggedUser?.id)!;
    if(this.loggedUserProject.role.name != "PROJECT_COLABORATOR" && this.loggedUserProject.role.name != "PROJECT_VIEWER"){
      this.hasPermission = true;
    }
    if(this.userProject?.role?.name == "PROJECT_COLABORATOR"){
      this.user.currentRole = "Colaborador"
    }
    if(this.userProject?.role?.name == "PROJECT_CREATOR"){
      this.user.currentRole = "Criador"
    }
    if(this.userProject?.role?.name == "PROJECT_ADM"){
      this.user.currentRole = "Administrador"
    }
    if(this.userProject?.role?.name == "PROJECT_VIEWER"){
      this.user.currentRole = "Espectador"
    }
  }

  @Input() user !: User

  @Input() confirmationAction !: Boolean | any
  @Output() quest: EventEmitter<string> = new EventEmitter<string>()
  listIdsFromRemove = new Array<Pick<User, "id">>

  @Input() project !: Project

  verifyImage() {
    // if(this.user.image){
    //   return false
    // } else if(this.user.imageColor){
    //   return true
    // }
    // return true
    if (this.user.image != null) {
      if (this.user.image.data != null) {
        return false
      }
    }
    return true
  }

  choosenRole(option : string   , userProjectReceived :UserProject){  
    
    if(option == "Administrador"){
      userProjectReceived.role.name = "PROJECT_ADM"
      this.user.currentRole = "Administrador"
    }
    if(option == "Colaborador"){
      userProjectReceived.role.name = "PROJECT_COLABORATOR"
      this.user.currentRole = "Colaborador"
    }
    if(option == "Espectador"){
      userProjectReceived.role.name = "PROJECT_VIEWER"
      this.user.currentRole = "Espectador"
    }
    this.service.setUserProjectRole(this.project.id,userProjectReceived);
  }

  getProjectCreator(project:Project):User{
    return project.members.find(userProject => userProject.manager)!.user
  }

  async removeMember() {
    let listIdsFromRemove:Array<any> = []
    if (this.user.id != this.getProjectCreator(this.project).id) {
      this.quest.emit("Realmente deseja remover um membro?");

      try {
        const confirmation = await this.waitForConfirmation();
        this.confirmationAction = undefined;

        if (confirmation) {
          this.project.members.splice(this.project.members.indexOf(this.project.members.find(member => member.user.id == this.user.id)!), 1)
          listIdsFromRemove.push({
            "id": this.user.id
          })

          this.project.members.filter( (userProject) => !listIdsFromRemove.find(e=> e.id = userProject.userId))
          await this.service.patchProjectRemoveMember(this.project.id, this.user.id)
        }

      } catch (ignore) { }
    }
  }

  waitForConfirmation(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {

      let timer: ReturnType<typeof setTimeout>;
      let intervalId: ReturnType<typeof setInterval>;

      timer = setTimeout(() => {
        clearInterval(intervalId);
      }, 30000);

      intervalId = setInterval(() => {
        if (typeof this.confirmationAction !== "undefined") {
          clearTimeout(timer);
          clearInterval(intervalId);
          resolve(this.confirmationAction as boolean);
        }
      }, 100);
    });
  };

}
