import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogarithmicScale } from 'chart.js';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { ColorService } from 'src/service/colorService';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss']
})
export class ModalConfigComponent implements OnInit {

  constructor( private cookieService: CookiesService, 
    private router: Router,
    private service: BackendEVOLVEService,
    private colorService: ColorService) { }
  @Output() close = new EventEmitter<boolean>();
  loggedUser !: User
  theme !: string
  email!: string
  disabledEmail = true
  password!: string
  disabledPassword = true
  async ngOnInit(): Promise<void> {
    console.log(document.documentElement.style.getPropertyValue('--primary-color'));

    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    this.theme=this.loggedUser.theme
    if(this.loggedUser.theme === 'dark'){
      this.themeDark = true
      this.theme='dark'
    }
    console.log(this.theme);

  }
  

  themeDark = false

   async darkMode(){

    console.log(this.themeDark);
    
    if(this.themeDark){
      document.documentElement.classList.add('dark')
      document.querySelector('.pi-moon')?.classList.add('pi-sun')
      document.querySelector('.pi-moon')?.classList.remove('pi-moon')
      this.loggedUser.theme = 'dark'
      this.theme='dark'
      localStorage.setItem('theme','dark')

    }else{
      document.documentElement.classList.remove('dark')
      document.querySelector('.pi-sun')?.classList.add('pi-moon')
      document.querySelector('.pi-sun')?.classList.remove('pi-sun')
      localStorage.setItem('theme','light')
      this.loggedUser.theme = 'light'
      this.theme='light'


    }

    await this.service.patchUserTheme(this.loggedUser.id, this.loggedUser.theme);
    console.log(this.loggedUser);

    
    this.themeDark = !this.themeDark

  }
  closeModal(){
    this.close.emit(false)

  }
  editEmail(){
    this.disabledEmail = false 
   
    
  }
  putEmail(){
    this.loggedUser.email =this.email;
    console.log(this.loggedUser);
    if (this.validarEmail(this.email)) {
      this.service.patchUserEmail(this.loggedUser.id, this.loggedUser.email)
      this.disabledEmail=true


  } else {
    alert("email inválido")
    this.email=this.loggedUser.email
    }
  
  }
  putPassword(){
    this.loggedUser.password =this.password;
    if (this.validarSenha(this.password)) {
      this.service.patchUserPassword(this.loggedUser.id, this.loggedUser.password)
      this.disabledPassword=true


  } else {
    alert("senha inválida")
    this.password=this.loggedUser.password
    }
    this.service.patchUserPassword(this.loggedUser.id, this.loggedUser.password)
    
  } 
  editPassword(){
    this.disabledPassword = false 
  }
  cancelPassword(){
    this.disabledPassword=true
  }
   validarEmail(email: string) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(email);
}

 validarSenha(senha: string) {
    const regexSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regexSenha.test(senha);
}
alterarCorDinamicamente(novaCor: string): void {
}
primaryColor = ""
secondaryColor = ""

changeColor(novaCor: string){
  console.log(this.primaryColor);
  if(!this.primaryColor){
    this.primaryColor=novaCor
    console.log(novaCor);
    
    this.colorService.setPrimaryColor(novaCor);
  }else if(!this.secondaryColor && this.primaryColor){
    this.secondaryColor=novaCor
    console.log();
    
    this.colorService.setSecondaryColor(novaCor)

  }else if(this.primaryColor==novaCor){
    this.primaryColor="";
  }else if(this.secondaryColor==novaCor){
    this.secondaryColor=""
  }
  


}
primaryDarkColor = ""
secondaryDarkColor = ""

changeDarkColor(novaCor: string){
  console.log(this.primaryDarkColor);
  if(!this.primaryDarkColor){
    this.primaryDarkColor=novaCor
    console.log(novaCor);
    
    this.colorService.setPrimaryDarkColor(novaCor);
  }else if(!this.secondaryDarkColor && this.primaryDarkColor){
    this.secondaryDarkColor=novaCor
    console.log();
    
    this.colorService.setSecondaryDarkColor(novaCor)

  }else if(this.primaryDarkColor==novaCor){
    this.primaryDarkColor="";
  }else if(this.secondaryDarkColor==novaCor){
    this.secondaryDarkColor=""
  }
  


}

}
