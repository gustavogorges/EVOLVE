import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-member-list-full-view-project',
  templateUrl: './member-list-full-view-project.component.html',
  styleUrls: ['./member-list-full-view-project.component.scss']
})
export class MemberListFullViewProjectComponent implements OnInit {

  constructor(private service : BackendEVOLVEService) { }

  ngOnInit(): void {
  }

  @Input() user !: User

  @Input() confirmationAction !: Boolean | any
  @Input() quest: any
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

  async removeMember() {
    let listIdsFromRemove = []
    if (this.user.id != this.project.creator.id) {
      this.quest.emit("Realmente deseja remover um membro?");

      try {
        const confirmation = await this.waitForConfirmation();
        this.confirmationAction = undefined;

        if (confirmation) {
          this.project.members.splice(this.project.members.indexOf(this.user), 1)
          listIdsFromRemove.push({
            "id": this.user.id
          })
          await this.service.deleteUserFromProject(this.project.id, listIdsFromRemove)
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
