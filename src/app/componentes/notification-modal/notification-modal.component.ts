import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  notification = false
  @Output() closeNotification : EventEmitter<boolean> = new EventEmitter
  constructor(private service : BackendEVOLVEService,
    private cookies_service : CookiesService, private elementRef: ElementRef
  ) { }

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookies_service.getLoggedUser();
    document.body.addEventListener('click', this.onDocumentClick);

  }

  openNotification(){
    this.notification = !this.notification
  }

  onDocumentClick = (event: any) => {
    if (!this.elementRef.nativeElement.contains(event.target) && event.target.tagName != "I") {
      this.notification = false
    }
  };

  openNotifications(team : Team){
    team.booleanView = true;
  }

  closeNotifications(team : Team){
    team.booleanView = false;
    team.notifications.forEach(notification => {
      notification.readed = true;
      this.service.patchReadedNotification(team.id,notification.id);
    });
    console.log(team.notifications);
    
  }


  cleanAllNotifications(){
    this.service.cleanAllUserNotifications(this.loggedUser.id);
  }

  verifyNotificatedList(notifications : Array<TeamNotification>):Array<TeamNotification>{
    let notificatedFilteredList = new Array<TeamNotification>();
    notifications.forEach(notification => {
      if(this.verifyIdOnNotificationList(notification)){
        notificatedFilteredList.push(notification);
      } 
    });
    if(notificatedFilteredList.length > 0) {
      return notificatedFilteredList;
    }
    return new Array<TeamNotification>();
  }

  verifyIdOnNotificationList(notification : TeamNotification) : boolean {
    return notification.notificatedUsers.some(user => user.id === this.loggedUser.id);
  }

}
