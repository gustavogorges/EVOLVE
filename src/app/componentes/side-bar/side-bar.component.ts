import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(    private cookieService: CookiesService, private router: Router
    ) { }
  
@Output() sideBar = new EventEmitter<boolean>();
loggedUser !: User
config = true
  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})

  }
  closeSideBar(){
    this.sideBar.emit(false)
  }

  goTelaTarefa( project : Project){
      this.router.navigate(['/tela-tarefa/'+project.id]);
      this.closeSideBar()

  }
  openConfig(){
    this.config=true
   // this.closeSideBar()
    
  }
  closeConfig(){
    this.config=false
  }

}
