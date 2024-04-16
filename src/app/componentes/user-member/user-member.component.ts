import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'app-user-member',
  templateUrl: './user-member.component.html',
  styleUrls: ['./user-member.component.scss']
})
export class UserMemberComponent implements OnInit {

  @Input() user!:User

  @Input() isUserSelected:boolean = false

  constructor() { 
  }

  async ngOnInit(): Promise<void> {  }

  getBackgroundColor(){
    return this.isUserSelected ? "bg-slate-200" : "bg-primaryWhite"
  }

}
