import { Location } from '@angular/common';
import { getHtmlTagDefinition, HtmlTagDefinition } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, HostListener, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationEnd, Route, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, window } from 'rxjs';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookiesService,  private service: BackendEVOLVEService,
    private translateService:TranslateService, private elementRef: ElementRef, private zone: NgZone) {}

  sideBar = false
  loggedUser !: User; 
  notification = false
  booleanTask = false
  task !: Task
  projeto !: Project
  openLangBol : boolean = false
  lang = ''
  @Output() reload : EventEmitter<any> = new EventEmitter
  @Output() exist : EventEmitter<any> = new EventEmitter


  closeTask(event: boolean) {
    if (event) {
      this.booleanTask = false;
    }
  }

  openTaskModal(task:any){
    this.task = task
    this.projeto = task.project as Project
    this.booleanTask = true
  }

  async ngOnInit(): Promise<void> {
    this.lang = localStorage.getItem('lang') || 'en'
    console.log(this.cookieService.getLoggedUserId());
    console.log(this.router.getCurrentNavigation());
    console.log(this.router);
    
    if(this.cookieService.getLoggedUserId()==''){
      this.exist.emit()
    }

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
    document.body.addEventListener('click', this.onDocumentClick);

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
    if(this.loggedUser ){
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

  @ViewChild('languages') languagesEvent !: ElementRef
  @HostListener('click', ['$event'])
  OutsideClick(event:Event){
    if(!this.languagesEvent.nativeElement.contains(event.target)){
      this.openLangBol = false
    }
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

  openLangueges(){
    this.openLangBol = !this.openLangBol
  }

  setLang(lang:string){
    localStorage.setItem('lang', lang)
    this.translateService.use(lang)
    this.lang = lang
    this.openLangBol = false
    this.reload.emit()
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
    this.notification= true
  }

  @ViewChild('sidebar') sidebarConfig !: ElementRef
  onDocumentClick = (event: MouseEvent) => {
    console.log(this.elementRef.nativeElement.contains(this.sidebarConfig));
    
    if (!this.elementRef.nativeElement.contains(event.target) && !this.elementRef.nativeElement.contains(this.sidebarConfig)) {
        this.openLangBol = false
    }
  };


  

}
