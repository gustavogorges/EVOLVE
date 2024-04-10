import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'app-user-member',
  templateUrl: './user-member.component.html',
  styleUrls: ['./user-member.component.scss']
})
export class UserMemberComponent implements OnInit {

  @Input() user!:User

  constructor() { 
  }

  async ngOnInit(): Promise<void> {  }

}
