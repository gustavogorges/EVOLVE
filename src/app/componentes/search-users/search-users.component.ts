import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  search:string=""
  users:Array<User> = new Array
  selectedUsers:Array<User> = new Array
  
  constructor(private service: BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.service.getAllSomething("user")
  }

  manageSelectedUsersUser(user:User){
    if(this.users.includes(user)){
      let userIndex:number = this.users.indexOf(user)
      this.users.splice(userIndex, 1)
    }
    this.selectedUsers.push(user)
  }

  isUserSelected(user:User):boolean{
    return this.selectedUsers.includes(user)
  }

  matchSearch(user:User):boolean{
    return this.search ? user.name.includes(this.search) : true
  }

}
