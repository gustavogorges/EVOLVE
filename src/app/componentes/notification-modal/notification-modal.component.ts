import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
    for(let teamRole of this.loggedUser.teamRoles){
      teamRole.team.notifications = await this.verifyNotificatedList(teamRole.team);
    }
    document.body.addEventListener('click', this.onDocumentClick);
  }

  openNotification(){
    this.notification = !this.notification
  }

  onDocumentClick = (event: any) => {
    if (!this.elementRef.nativeElement.contains(event.target) && event.target.tagName != "I" && !(event.target.classList.value as string).includes("no-close")) {
      this.notification = false
    }
  };



  async openNotifications(team : Team){
    team.booleanView = true;
  }

  closeNotifications(team : Team){
    team.booleanView = false;
    team.notifications?.forEach(notification => {
      notification.readed = true;
      this.service.patchReadedNotification(team.id,notification.id);
    });
  }


 async cleanAllNotifications(){
    this.service.cleanAllUserNotifications(this.loggedUser.id);
    this.loggedUser = await this.cookies_service.getLoggedUser()
  }

   async verifyNotificatedList(team : Team):Promise<Array<TeamNotification>>{
    
    let notifications : Array<TeamNotification> = await this.service.getAllNotifications(team.id);
    let notificatedFilteredList = new Array<TeamNotification>();
    notifications?.forEach(notification => {
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

  editingConfigs:boolean=false

  editNotificationsConfig(){
    this.editingConfigs = true
  }

  async cancelEditingConfigs(){
    this.editingConfigs = false
    this.loggedUser = await this.service.getOne("user", this.loggedUser.id)
  }

  async saveConfigs(){
    this.editingConfigs = false
    this.loggedUser = await this.service.patchNotificationsConfig(this.loggedUser.id, this.loggedUser.notificationsConfig)
  }



}
