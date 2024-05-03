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
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, this.emailValidator]),
      password: new FormControl('', [Validators.required, this.passwordValidator]),
      confirmationPassword: new FormControl('', [Validators.required, this.passwordMatchValidator])
    } ); // Pass the validator function directly here
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




  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') === -1) {
      return { 'invalidEmail': true };
    }
    if (email && email.indexOf('.') === -1) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (password && password.length < 6) {
      console.log(1);
      
      return { 'passwordLength': true };
    }
    if (password && !/\d/.test(password)) {
      console.log(2);

      return { 'passwordNoNumber': true };
    }
    if (password && !/[!@#$%^&*(),.?-_":{}|<>]/.test(password)) {
      console.log(3);

      return { 'passwordNoSpecialCharacter': true };
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
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmationPassword = control.parent?.get('confirmationPassword');

    if (password && confirmationPassword && password.value !== confirmationPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
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
  status = 0  
  async submit(){
    console.log("Eu entrei po, viaja não fi")
    this.usuario.name = this.formControls['name'].value;
    this.usuario.email = this.formControls['email'].value;
    this.usuario.password = this.formControls['password'].value;
    
    this.usuario.imageColor = this.randomizeColor()
    if(this.usuario.email !=null && this.usuario.name!=null && this.usuario.password!=null){
      this.status  = await this.service.postUsuario(this.usuario)
      if(this.status >= 200 && this.status < 300){
        this.message = "sua conta foi cadastrada com sucesso"
        this.showConfirmationMessage = true;
  
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2500);
      }else{
        this.message = "não foi possivel cadastrar sua conta"
        this.showConfirmationMessage = true;
  
      }

    }
  

    }
    closeModal(){
    this.showConfirmationMessage = false 
    }
  }



