import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { ColorService } from 'src/service/colorService';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(    private cookieService: CookiesService, private router: Router,  
    private colorService: ColorService
    ) { }
  
@Output() sideBar = new EventEmitter<boolean>();
loggedUser !: User
config = false
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
  goTelaInicial(){
    this.router.navigateByUrl('/tela-inicial');

  }
  logOut(){
    this.cookieService.setLoggedUserId( null)
    this.closeSideBar()
    this.colorService.setPrimaryColor("#185e77")
    this.colorService.setSecondaryColor("#4C956C")
    this.colorService.setPrimaryDarkColor("#67BFE0")
    this.colorService.setSecondaryDarkColor("#86C19F")
    this.router.navigate(['/']);



  }
  goProjetos(){
    this.router.navigate(["/tela-projeto"])
  }

}
