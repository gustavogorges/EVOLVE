import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { UserProject } from 'src/model/userProject';
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

  async ngOnInit() {
    this.loggedUser = await this.cookies_service.getLoggedUser();
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
          console.log(this.project.members);
          await this.service.patchProjectRemoveMember(this.project.id, this.user.id)
          // await this.service.deleteUserFromProject(this.project.id,this.loggedUser.id,listIdsFromRemove)

        }

      } catch (ignore) { }
    }
  }

  waitForConfirmation(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      console.log("waitForConfirmation() called");

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
