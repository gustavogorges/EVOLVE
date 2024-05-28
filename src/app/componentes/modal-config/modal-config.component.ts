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
    private colorService: ColorService) {
      this.currentFontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
     }
  @Output() close = new EventEmitter<boolean>();
  loggedUser !: User
  theme !: string
  email!: string
  disabledEmail = true
  password!: string
  disabledPassword = true
  defaultColors = false
  currentFontSize: number;
  sliderValue = 0

  async ngOnInit(): Promise<void> {

    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user})
    this.theme=this.loggedUser.theme
    this.checkDefaultColors();
    this.sliderValue = this.loggedUser.fontSize
 
  }
  

  themeDark = false

   
  closeModal(){
    this.close.emit(false)

  }
  editEmail(){
    console.log("chego aqui");
    
    this.disabledEmail = false 
    console.log(this.disabledEmail);
    
   
    
  }
  putEmail(){
    this.loggedUser.email =this.email;
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
  cancelEmail(){
    this.disabledEmail=true
  }
   validarEmail(email: string) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(email);
}

 validarSenha(senha: string) {
    const regexSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{6,}$/;
    return regexSenha.test(senha);
}
alterarCorDinamicamente(novaCor: string): void {
}
primaryColor = ""
secondaryColor = ""

changeColor(novaCor: string){
  if(this.primaryColor && this.secondaryColor){
    this.primaryColor = ''
    this.secondaryColor = ''
  }
  this.divSelecionada = !this.divSelecionada;
  if(this.primaryColor == "#185E77"  ){
    this.primaryColor="";
   
  }else if(this.secondaryColor == "#4C956C"){
    this.secondaryColor=""; 

  }
  
  if(!this.primaryColor){

    this.loggedUser.primaryColor=novaCor
    this.primaryColor=this.loggedUser.primaryColor
    this.service.patchUserPrimaryColor(this.loggedUser.id, this.loggedUser.primaryColor)
    
    this.colorService.setPrimaryColor(novaCor);
  }else if(!this.secondaryColor && this.primaryColor){

    this.loggedUser.secondaryColor=novaCor
    this.service.patchUserSecondaryColor(this.loggedUser.id, this.loggedUser.secondaryColor)

    this.secondaryColor=this.loggedUser.secondaryColor
    
    this.colorService.setSecondaryColor(novaCor)

  }
  
  else if(this.primaryColor==novaCor){

    this.primaryColor="";
  }else if(this.secondaryColor==novaCor){

    this.secondaryColor=""
  }

  this.checkDefaultColors()

}
primaryDarkColor = ""
secondaryDarkColor = ""
divSelecionada: boolean = false;

changeDarkColor(novaCor: string){
  if(this.primaryDarkColor && this.secondaryDarkColor){
    this.primaryDarkColor = ''
    this.secondaryDarkColor = ''
  }
  if(this.primaryDarkColor =="#67BFE0"  ){
    this.primaryDarkColor="";
   
  }else if(this.secondaryDarkColor=="#86C19F"){
    this.secondaryDarkColor=""; 

  }
  
  if(!this.primaryDarkColor){
    
    this.loggedUser.primaryDarkColor=novaCor
    this.primaryDarkColor=this.loggedUser.primaryDarkColor
    this.service.patchUserPrimaryDarkColor(this.loggedUser.id, this.loggedUser.primaryDarkColor)
    this.colorService.setPrimaryDarkColor(novaCor);
  }else if(!this.secondaryDarkColor && this.primaryDarkColor){

    this.loggedUser.secondaryDarkColor=novaCor
    this.service.patchUserSecondaryDarkColor(this.loggedUser.id, this.loggedUser.secondaryDarkColor)

    this.secondaryDarkColor=this.loggedUser.secondaryDarkColor
    this.colorService.setSecondaryDarkColor(novaCor)

  }else if(this.primaryDarkColor==novaCor){

    this.primaryDarkColor="";
  }else if(this.secondaryDarkColor==novaCor){

    this.secondaryDarkColor=""
  }
  this.checkDefaultColors()
  


}
checkDefaultColors(){
  
  
  if((this.loggedUser.primaryColor=='#185E77'||this.loggedUser.secondaryColor=='#4C956C')&&(this.loggedUser.primaryDarkColor=='#67BFE0'||this.loggedUser.secondaryDarkColor=='#86C19F' )){
    
    this.defaultColors=true
    return true; 
  }else{
    
    this.defaultColors=false
    return false 
  }
  
}
async changeToDefault(){
  this.defaultColors = true;
  this.loggedUser.primaryColor='#185E77'
  this.primaryColor=this.loggedUser.primaryColor
  await this.service.patchUserPrimaryColor(this.loggedUser.id, this.loggedUser.primaryColor)
  this.colorService.setPrimaryColor(this.loggedUser.primaryColor);

  this.loggedUser.secondaryColor='#4C956C'
  this.secondaryColor=this.loggedUser.secondaryColor
  await this.service.patchUserSecondaryColor(this.loggedUser.id, this.loggedUser.secondaryColor)
  this.colorService.setSecondaryColor(this.loggedUser.secondaryColor)

  this.loggedUser.primaryDarkColor='#67BFE0'
  this.primaryDarkColor=this.loggedUser.primaryDarkColor
  await this.service.patchUserPrimaryDarkColor(this.loggedUser.id, this.loggedUser.primaryDarkColor)
  this.colorService.setPrimaryDarkColor(this.primaryDarkColor);

  this.loggedUser.secondaryDarkColor='#86C19F' 
  this.secondaryDarkColor=this.loggedUser.secondaryDarkColor
 await  this.service.patchUserSecondaryDarkColor(this.loggedUser.id, this.loggedUser.secondaryDarkColor)
    this.colorService.setSecondaryDarkColor(this.loggedUser.secondaryDarkColor)

}
 
changeFont(){
  
  document.documentElement.style.setProperty('--font-size-base', ''+this.sliderValue+'px');
  document.documentElement.style.setProperty('--font-size-sm', ''+(this.sliderValue-2)+'px');
  document.documentElement.style.setProperty('--font-size-lg', ''+(this.sliderValue+2)+'px');
  document.documentElement.style.setProperty('--font-size-xl', ''+(this.sliderValue+4)+'px');
  document.documentElement.style.setProperty('--font-size-2xl', ''+(this.sliderValue+8)+'px');
  document.documentElement.style.setProperty('--font-size-3xl', ''+(this.sliderValue+14)+'px');

 this.service.patchUserFontSize(this.loggedUser.id, this.sliderValue)
}

}
