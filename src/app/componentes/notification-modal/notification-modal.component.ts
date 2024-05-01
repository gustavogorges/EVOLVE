import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/model/team';
import { TeamNotification } from 'src/model/teamNotification';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  loggedUser : User = new User;

  constructor(private service : BackendEVOLVEService,
    private cookies_service : CookiesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookies_service.getLoggedUser();
  }

  openNotifications(team : Team){
    team.booleanView = true;
  }

  closeNotifications(team : Team){
    team.booleanView = false;
    team.notifications.forEach(notification => {
      notification.readed = true;
      this.service.patchReadedNotification(team.id,notification.id);
    });
  }


  cleanAllNotifications(){
    this.service.cleanAllUserNotifications(this.loggedUser.id);
  }

//  verifyNotificatedList(team : Team):Array<TeamNotification>{
//    console.log(team.notifications);
//   
//    team.notifications.forEach(notification => {
//      if(notification.notificatedUsers.find(user => user.id == this.loggedUser.id) != null){
//        console.log("ENTROU AQUI E TA CERTO");
//        return team.notifications;
//      } 
//      return new Array<TeamNotification>(); 
//    });
//    return new Array<TeamNotification>();
//  }


}
