
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sortedUniq } from 'lodash';
import { MessageService } from 'primeng/api';
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
    private router : Router,
    private colorService : ColorService, 
    private translateService : TranslateService,
    private textToSpeechService: TextToSpeechService,
    private authService : AuthService,
    private messageService : MessageService

    ){
      if(localStorage.getItem('lang') === null){
        localStorage.setItem('lang', 'en')
      }
      this.translateService.setDefaultLang('en')
      this.translateService.use(localStorage.getItem('lang') || 'en')
    }

  title = 'Evolve';
  loggedUser !: User;

  reload(){
    window.location.reload()
  }

  islogged = false

  async ngOnInit(): Promise<void> {

    window.addEventListener('erroModal', async (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(customEvent.detail);
      this.addSingle(customEvent.detail);
     })

    window.addEventListener('login', async (event: Event) => { 
      this.islogged = true
    })

    window.addEventListener('logout', async (event: Event) => { 
      this.islogged = false
    })

    if(this.authService.isLoggedIn()){
      this.islogged = true
    }

    if(!this.isNotLandingPage()){
      this.islogged = true
    }

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

  isNotLandingPage(){

    if(this.getRotaAtual() === '/'){
      return false;
    }
    return true;
  }

  getRotaAtual(){
    return this.router.url;
  }

  addSingle(detail : string) {
    this.messageService.add({severity:'error', summary:detail, detail:'Via BackendEVOLVE'});
}

  updateStatus(){
    this.islogged = true
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const selectedText = window.getSelection()!.toString().trim();
    if (selectedText) {
      if (this.textToSpeechService.canSpeak) {
        this.textToSpeechService.speak(selectedText);
      }
    }
  }
}
