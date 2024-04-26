import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/model/team';
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


}
