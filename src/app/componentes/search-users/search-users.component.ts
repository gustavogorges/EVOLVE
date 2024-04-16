import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit{

  search:string=""
  users:Array<User> = new Array
  selectedUsers:Array<User> = new Array
  @Input() addedUsers:Array<User> = new Array

  @Output() usersToAdd:EventEmitter<Array<User>> = new EventEmitter

  
  constructor(private service: BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.service.getAllSomething("user")
    let bah = this.users.filter(user => !this.addedUsers.includes(user))
    this.users = bah
 
     
     console.dir(this.addedUsers);
     console.dir(bah);
     
     this.users.sort(this.sortByUserName)
    
  }



  addUsers(usersToAdd:Array<User>){
    this.usersToAdd.emit(usersToAdd)
  }


  getUsers():Array<User>{
    return this.users.sort(this.sortByUserName)
  }
  getSelectedUsers():Array<User>{
    return this.selectedUsers.sort(this.sortByUserName)
  }

  selectUser(user:User):void{
    if(this.users.includes(user)){
      let userIndex:number = this.users.indexOf(user)
      this.users.splice(userIndex, 1)
    }
    this.selectedUsers.push(user)
  }

  unselectUser(user:User):void{
      if(this.isUserSelected(user)){
        let userIndex:number = this.selectedUsers.indexOf(user)
        this.selectedUsers.splice(userIndex, 1)
      }
      this.users.push(user)
  }


  isUserSelected(user:User):boolean{
    return this.selectedUsers.includes(user)
  }

  matchSearch(user:User):boolean{
    return this.searchMatchUserEmail(user) || this.searchMatchUserName(user)
  }

  searchMatchUserName(user:User):boolean{
    return this.search ? user.name.toLowerCase().includes(this.search.toLowerCase()) : true
  }

  searchMatchUserEmail(user:User):boolean{
    return this.search ? user.email.toLowerCase().includes(this.search.toLowerCase()) : true
  }

  sortByUserName(a:User, b:User) {
    const nameA = a.name.toUpperCase();
    const nameb = b.name.toUpperCase();
    
    if (nameA < nameb) {
        return -1;
    }
    if (nameA > nameb) {
        return 1;
    }
    return 0;
}

}
