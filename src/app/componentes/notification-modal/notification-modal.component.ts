import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LogarithmicScale } from 'chart.js';
import { NotificationsConfig } from 'src/model/notificationsConfig';
import { Team } from 'src/model/team';
import { TeamNotification } from 'src/model/teamNotification';
import { User } from 'src/model/user';
import { UserTeam } from 'src/model/userTeam';
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
    this.changeEnableProjectConfig()
    this.changeEnableTaskConfig()
  }

  openNotification(){
    this.notification = !this.notification
  }

  onDocumentClick = (event: any) => {
    if (!this.elementRef.nativeElement.contains(event.target) && event.target.tagName != "I" && !(event.target.classList.value as string).includes("no-close")) {
      console.log(event.target.classList.value);
      this.notification = false
    }
  };



  async openNotifications(team : Team){
    console.log(await this.service.getAllNotifications(team.id));
    team.booleanView = true;
  }

  closeNotifications(team : Team){
    team.booleanView = false;
    team.notifications?.forEach(notification => {
      notification.readed = true;
      this.service.patchReadedNotification(team.id,notification.id);
    });
    console.log(team.notifications);
    
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
  lastConfig:NotificationsConfig|null = null
  editNotificationsConfig(){
    this.editingConfigs = true
    this.lastConfig = this.loggedUser.notificationsConfig
  }

  a(){
    console.log(this.loggedUser.notificationsConfig);
  }
  @ViewChildren('taskOption') taskOptions!: any;
  changeEnableTaskConfig(){
    let elementsToChange:any[] = this.taskOptions._results
    elementsToChange.forEach(elementRef => elementRef.nativeElement.disabled = !this.loggedUser.notificationsConfig.taskAll) 
  }

  @ViewChildren('projectOption') projectOptions!: any;
  changeEnableProjectConfig(){
    let elementsToChange:any[] = this.projectOptions._results
    elementsToChange.forEach(elementRef => elementRef.nativeElement.disabled = !this.loggedUser.notificationsConfig.projectAll) 
  }

  async cancelEditingConfigs(){
    this.editingConfigs = false
    this.loggedUser = await this.service.getOne("user", this.loggedUser.id)
    this.lastConfig = null
  }

  async saveConfigs(){
    this.editingConfigs = false
    this.lastConfig = null
    this.loggedUser = await this.service.patchNotificationsConfig(this.loggedUser.id, this.loggedUser.notificationsConfig)
    console.log(this.loggedUser.notificationsConfig);
  }



}
