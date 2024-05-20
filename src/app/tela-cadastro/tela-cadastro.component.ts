import { compileFactoryFunction } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.scss']
})
export class TelaCadastroComponent implements OnInit {

  usuario : User = new User();
  userForm !: FormGroup

  constructor(private service : BackendEVOLVEService, private router: Router) { 
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      const event = new CustomEvent('logout');
      window.dispatchEvent(event);
    }, 100);
    window.addEventListener('registration', async (event: Event) => {
      
      const customEvent = event as CustomEvent;
      const userData = customEvent.detail;  
      console.log(userData);
      await this.create(userData);
      
      });
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?-_":{}|<>]).*$/)]),
      confirmationPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  get name() {
    return this.userForm.get("name");
  }

  get email() {
    return this.userForm.get("email");
  }

  get password() {
    return this.userForm.get("password");
  }

  get confirmationPassword() {
    return this.userForm.get("confirmationPassword");
  }
  GoLogin(){
    window.location.href = "/"
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmationPassword = control.get('confirmationPassword')?.value;

    if (password !== confirmationPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  randomizeColor(){
    let str = '#';
    while (str.length < 7) {
      str += Math.floor(Math.random() * 0x10).toString(16);
    }
    return str.toUpperCase()
  }

  moveFocus(fieldName: string): void {
    const nextInput = document.querySelector(`input[formControlName='${fieldName}']`) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }
  get formControls() {
    return this.userForm.controls;
  }
  showConfirmationMessage = false;
  message  = "cadastro foiii" 
  status !: any

  async submit(){
    console.log("Eu entrei po, viaja não fi")
    this.usuario.name = this.formControls['name'].value;
    this.usuario.email = this.formControls['email'].value;
    this.usuario.password = this.formControls['password'].value;
    
    this.usuario.imageColor = this.randomizeColor()
    if(this.usuario.email !=null && this.usuario.name!=null && this.usuario.password!=null){
      this.status  = await this.service.postUsuario(this.usuario)
      console.log(this.status);
      
      if(this.status.status >= 200 && this.status.status < 300){
        this.message = "sua conta foi cadastrada com sucesso"
        this.showConfirmationMessage = true;
  
        setTimeout(() => {
          window.location.href = "/"
          
        }, 1000);
      }else{
        this.message = "não foi possivel cadastrar sua conta"
        this.showConfirmationMessage = true;
  
      }

    }
  

    }
    async create(userData : any){
      console.log("TESTEEEEE");
      
      this.usuario.email = userData.email
      this.usuario.name = userData.name
      this.usuario.image = userData.picture
      this.usuario.password = ''
      console.log(this.usuario);
      
      this.status  = await this.service.postUsuario(this.usuario)
      console.log(this.status);
      
      if(this.status.status >= 200 && this.status.status < 300){
        this.message = "sua conta foi cadastrada com sucesso"
        this.showConfirmationMessage = true;
  
        setTimeout(() => {
          window.location.href = "/"
        }, 1000);
      }else{
        this.message = "não foi possivel cadastrar sua conta"
        this.showConfirmationMessage = true;
  
      }
    }
    closeModal(){
    this.showConfirmationMessage = false 
    }
  }



