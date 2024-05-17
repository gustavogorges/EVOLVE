
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sortedUniq } from 'lodash';
import { User } from 'src/model/user';
import { AuthService } from 'src/service/autService';
import { ColorService } from 'src/service/colorService';
import { CookiesService } from 'src/service/cookies-service.service';
import { TextToSpeechService } from 'src/service/text-to-speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(    private cookieService: CookiesService, 

    private colorService : ColorService, 
    private translateService : TranslateService,
    private textToSpeechService: TextToSpeechService,
    private authService : AuthService

    ){
      if(localStorage.getItem('lang') === null){
        localStorage.setItem('lang', 'en')
      }
      this.translateService.setDefaultLang('en')
      this.translateService.use(localStorage.getItem('lang') || 'en')
    }

  title = 'Evolve';
  loggedUser !: User;

  // boo = false

  reload(){
    window.location.reload()
  }

  islogged = false

  // a(){
  //   if(this.cookieService.getLoggedUserId() && this.cookieService.getLoggedUserId()!="0"){
  //     this.islogged = true
  //   } else {
  //     console.log(this.cookieService.getLoggedUserId());
      
  //     this.islogged = false
  //   }
  //   this.a()
  // }

  async ngOnInit(): Promise<void> {

    window.addEventListener('login', async (event: Event) => { 
      this.islogged = true
    })

    window.addEventListener('logout', async (event: Event) => { 
      this.islogged = false
    })

    if(this.authService.isLoggedIn()){
      this.loggedUser = await this.cookieService.getLoggedUser();
    }
    this.authService.loggedInChanged.subscribe(isLoggedIn => {
      this.islogged = isLoggedIn;
    });
  //  this.a()
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

  updateStatus(){
    console.log("Entrei na funcao");
    
    this.islogged = true
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const selectedText = window.getSelection()!.toString().trim();
    if (selectedText) {
      console.log("entrou aqui");
      console.log(this.textToSpeechService.canSpeak);
      if (this.textToSpeechService.canSpeak) {
        console.log("entrou aqui 2");
        this.textToSpeechService.speak(selectedText);
      }
    }
  }
}
