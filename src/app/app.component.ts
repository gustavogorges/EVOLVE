import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { AuthService } from 'src/service/autService';
import { ColorService } from 'src/service/colorService';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(    private cookieService: CookiesService, 
    private colorService : ColorService, private authService :AuthService

    ){}
  title = 'angularProject';
  loggedUser !: User; 
  boo = false 
  async ngOnInit(): Promise<void> {
    if(this.authService.isLoggedIn()){
      this.boo = true
    }
    this.loggedUser = await this.cookieService.getLoggedUser();
    
    if(this.loggedUser){
      if(this.loggedUser.theme=="dark"){
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme','dark')
      }else{
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme','light')
    
      }   
      if(this.loggedUser.primaryColor || this.loggedUser.secondaryColor){
        this.colorService.setPrimaryColor(this.loggedUser.primaryColor)
        this.colorService.setSecondaryColor(this.loggedUser.secondaryColor)
        this.colorService.setPrimaryDarkColor(this.loggedUser.primaryDarkColor)
        this.colorService.setSecondaryDarkColor(this.loggedUser.secondaryDarkColor)
      }else{
  
        this.colorService.setPrimaryDarkColor("#67BFE0")
        this.colorService.setSecondaryDarkColor("#86C19F")
        this.colorService.setPrimaryColor("#185E77")
        this.colorService.setSecondaryColor("#4C956C")
      }
     
    }
    
  }
}
