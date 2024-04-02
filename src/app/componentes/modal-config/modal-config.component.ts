import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss']
})
export class ModalConfigComponent implements OnInit {

  constructor( private cookieService: CookiesService, private router: Router, private service: BackendEVOLVEService) { }
  @Output() close = new EventEmitter<boolean>();
  loggedUser !: User
  theme ='claro'
  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    if(localStorage.getItem('theme') === 'dark'){
      this.themeDark = true
      this.theme='escuro'
    }
    this.darkMode()
    console.log(this.theme);

  }
  

  themeDark = false

  darkMode(){
    if(this.themeDark){
      document.documentElement.classList.add('dark')
      document.querySelector('.pi-moon')?.classList.add('pi-sun')
      document.querySelector('.pi-moon')?.classList.remove('pi-moon')
      this.loggedUser.theme = 'light'
    }else{
      document.documentElement.classList.remove('dark')
      document.querySelector('.pi-sun')?.classList.add('pi-moon')
      document.querySelector('.pi-sun')?.classList.remove('pi-sun')
      localStorage.setItem('theme','light')
      this.loggedUser.theme = 'dark'

    }
    this.service.putUsuario(this.loggedUser);
    
    this.themeDark = !this.themeDark
  }
  closeModal(){
    this.close.emit(false)
  }

}
