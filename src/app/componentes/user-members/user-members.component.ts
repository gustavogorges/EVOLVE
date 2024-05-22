import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'app-user-members',
  templateUrl: './user-members.component.html',
  styleUrls: ['./user-members.component.scss']
})
export class UserMembersComponent implements OnInit {

  @Input() user!:User

  @Input() isUserSelected:boolean = false

  constructor() { 
  }

  async ngOnInit(): Promise<void> {  }

  getBackgroundColor(){
    return this.isUserSelected ? "bg-slate-200 dark:bg-dark-secundary-gray " : "bg-primaryWhite dark:bg-dark-primary-black"
  }

}