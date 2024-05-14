import { getHtmlTagDefinition, HtmlTagDefinition } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { filter, window } from 'rxjs';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent implements OnInit {

  constructor(private router: Router,     private cookieService: CookiesService,  private service: BackendEVOLVEService,
    ) { }
  sideBar = false
  loggedUser !: User; 
  notification = false 

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookieService
    .getLoggedUser()
    .then((user) => {
      return user;
    });
    if(this.loggedUser){
      this.changeFont()

      if(this.loggedUser.theme == 'dark'){
        this.themeDark = true
      }
    }else{
      this.themeDark=false
    }
   
    this.darkMode()
  }

  themeDark = false

  async darkMode(){
    if(this.themeDark){
      document.documentElement.classList.add('dark')
      document.querySelector('.pi-moon')?.classList.add('pi-sun')
      document.querySelector('.pi-moon')?.classList.remove('pi-moon')
      localStorage.setItem('theme','dark')
      if(this.loggedUser){
        this.loggedUser.theme = 'dark'
      }
    

    }else{
      document.documentElement.classList.remove('dark')
      document.querySelector('.pi-sun')?.classList.add('pi-moon')
      document.querySelector('.pi-sun')?.classList.remove('pi-sun')
      localStorage.setItem('theme','light')
      if(this.loggedUser){
        this.loggedUser.theme = 'light'
      }
    

    }
    this.themeDark = !this.themeDark
    if(this.loggedUser){
      await this.service.patchUserTheme(this.loggedUser.id, this.loggedUser.theme);
    }
  }

  
  async irParaPerfil(): Promise<void> {
    this.loggedUser = await this.cookieService
        .getLoggedUser()
        .then((user) => {
          return user;
        });
    this.router.navigate(['/tela-perfil/'+this.loggedUser.id]);

    }
  goInitialPage(): void {
    this.router.navigateByUrl('/tela-inicial');
  }
  openSideBar(){
    if(this.sideBar==true){
      this.sideBar=false
    }else{
      this.sideBar=true
    }
    console.log(this.sideBar);
    
  }
  closeSideBar(bar : boolean){
    this.sideBar=false
  }
  teste(){
    document.querySelector('.pi-moon')?.classList.add('pi-sun')
    document.querySelector('.pi-moon')?.classList.remove('pi-moon')
  }

  changeFont(){
    document.documentElement.style.setProperty('--font-size-base', ''+this.loggedUser.fontSize+'px');
    document.documentElement.style.setProperty('--font-size-sm', ''+(this.loggedUser.fontSize-2)+'px');
    document.documentElement.style.setProperty('--font-size-lg', ''+(this.loggedUser.fontSize+2)+'px');
    document.documentElement.style.setProperty('--font-size-xl', ''+(this.loggedUser.fontSize+4)+'px');
    document.documentElement.style.setProperty('--font-size-2xl', ''+(this.loggedUser.fontSize+8)+'px');
    document.documentElement.style.setProperty('--font-size-3xl', ''+(this.loggedUser.fontSize+14)+'px');
  }

  openNotification(){
    this.notification= !this.notification
  }

}
