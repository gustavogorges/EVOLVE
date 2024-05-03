import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import emailjs, { send } from '@emailjs/browser'; 
import { getRtlScrollAxisType } from '@angular/cdk/platform';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss'],
})
export class TelaLoginComponent implements OnInit {

  usuario : User = new User();
  userForm !: FormGroup
  passwordForm !:FormGroup

  constructor(private router: Router, private service: BackendEVOLVEService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    } );
    this.passwordForm = new FormGroup({
      password2: new FormControl('', [Validators.required, this.passwordValidator]),
      confirmationPassword: new FormControl('', [Validators.required, this.passwordMatchValidator])
    } );
 
  }
  get email() {
    return this.userForm.get("email");
  }

  get password() {
    return this.userForm.get("password");
  }
  submit(){
    // [disabled]="!passwordForm.valid"
  }
  get formControls() {
    return this.passwordForm.controls;
  }
  moveFocus(fieldName: string): void {
    const nextInput = document.querySelector(`input[formControlName='${fieldName}']`) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }


  // async login(): Promise<void> {
  //   this.usuario = await this.service.getUser(this.email);
  //   if (this.usuario) {
  //     this.router.navigate(['/tela-inicial'], { state: { user: this.usuario } });
  //   }
  // }

  cadastro(): void {
    console.log('foi');
    this.router.navigate(['/tela-cadastro']);
  }
  usuario_name = "deborah"

  sendEmail(){
    emailjs.init('XHV0l72FOJjWsJv8e')
  let respose  = emailjs.send("service_7u4di7t","template_m75iojj",{
    from_name: "Evolve",
    from_email :"elomattge@gmail.com", 
    to_name: this.usuario_name,
    code: ''+this.randomNumbers[0]+this.randomNumbers[1]+this.randomNumbers[2]+this.randomNumbers[3]+this.randomNumbers[4]+this.randomNumbers[5]
    });
  }
  randomNumbers: number[] = [];

  generateRandomNumbers() {
    this.randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      this.randomNumbers.push(Math.floor(Math.random() * 9)); // Gera números aleatórios de 1 a 100
    }
    return this.randomNumbers
  }
  changePassword = false
  openChangePassword(){
    this.changePassword = true
  }
  changeEmail =  ''
  emailModal = true
  codeModal = false
  passwordModal = false
  n1 !: number
  n2!: number
  n3 !: number
  n4!: number
  n5 !: number
  n6!: number
  user !:User
  async verifyEmail(){
    console.log(this.changeEmail);
this.user  =await  this.service.getUser(this.changeEmail); 
 if(this.user.id !=null){
  this.generateRandomNumbers()
  console.log(this.randomNumbers);

      this.sendEmail()  
      this.emailModal = false 
      this.codeModal = true
 }
  }
  closeModal(){
    this.changePassword = false 
    this.passwordModal = false 
    this.emailModal = true 
    this.codeModal = false
  }
  moveFocusNumbers(currentInput: HTMLInputElement, nextInput: HTMLInputElement | null): void {
    if (currentInput.value.length >= 1 && nextInput) {
      nextInput.focus();
    }
  }
  showConfirmationMessage = false 
  message = ""
  verifyCode(){
    
    if(this.n1 == this.randomNumbers[0] && this.n2 == this.randomNumbers[1]&& this.n3 == this.randomNumbers[2]&& this.n4 == this.randomNumbers[3]&& this.n5 == this.randomNumbers[4]&& this.n6 == this.randomNumbers[5]){
      console.log(true );
      this.codeModal =false 
      this.passwordModal = true
    }
  }

  passwordReset(){
    console.log(
      this.formControls
    );
    
    // this.user.password = this.formControls['password2'].value;
    // console.log(this.user);
    
    // this.service.patchUserPassword(this.user.id, this.user.password)
    // this.closeModal()
    //   this.message = "senha alterada com sucesso"
    // this.showConfirmationMessage = true
   }



















  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password2 = control.value;
    if (password2 && password2.length < 6) {
      console.log(1);
      
      return { 'passwordLength': true };
    }
    if (password2 && !/\d/.test(password2)) {
      console.log(2);

      return { 'passwordNoNumber': true };
    }
    if (password2 && !/[!@#$%^&*(),.?-_":{}|<>]/.test(password2)) {
      console.log(3);

      return { 'passwordNoSpecialCharacter': true };
    }
    return null;
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password2 = control.parent?.get('password2');
    const confirmationPassword = control.parent?.get('confirmationPassword');

    if (password2 && confirmationPassword && password2.value !== confirmationPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  get password2() {
    return this.userForm.get("password2");
  }

  get confirmationPassword() {
    return this.userForm.get("confirmationPassword");
  }



}
