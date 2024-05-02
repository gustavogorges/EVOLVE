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
    console.log(33);
    
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    console.log(this.config);
    
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
  sliderValue = 16 
  logOut(){
    this.cookieService.setLoggedUserId( null)
    this.closeSideBar()
    this.colorService.setPrimaryColor("#185e77")
    this.colorService.setSecondaryColor("#4C956C")
    this.colorService.setPrimaryDarkColor("#67BFE0")
    this.colorService.setSecondaryDarkColor("#86C19F")
    document.documentElement.style.setProperty('--font-size-base', ''+this.sliderValue+'px');
    document.documentElement.style.setProperty('--font-size-sm', ''+(this.sliderValue-2)+'px');
    document.documentElement.style.setProperty('--font-size-lg', ''+(this.sliderValue+2)+'px');
    document.documentElement.style.setProperty('--font-size-xl', ''+(this.sliderValue+4)+'px');
    document.documentElement.style.setProperty('--font-size-2xl', ''+(this.sliderValue+8)+'px');
    document.documentElement.style.setProperty('--font-size-3xl', ''+(this.sliderValue+14)+'px');
  
    this.router.navigate(['/']);



  }
  goProjetos(){
    this.router.navigate(["/tela-projeto"])
  }

}
