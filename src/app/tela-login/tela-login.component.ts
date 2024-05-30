import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { MessageService } from 'primeng/api';
import emailjs, { send } from '@emailjs/browser';
import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { AuthService } from 'src/service/autService';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from 'src/service/cookies-service.service';
import { sortedUniq } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss'],
})
export class TelaLoginComponent implements OnInit {
  usuario: User = new User();
  userForm!: FormGroup;
  passwordForm!: FormGroup;

  @Output() login : EventEmitter<any> = new EventEmitter

  constructor(private router: Router,private coockiesService:CookiesService, private service: BackendEVOLVEService, private authService :AuthService,
    private cookie : CookiesService, private messageService : MessageService) {}


  ngOnInit(): void {
    setTimeout(() => {
      const event = new CustomEvent('logout');
      window.dispatchEvent(event);
    }, 100);
    // this.coockiesService.setLoggedUserId(0)
    window.addEventListener('userLoggedIn', async (event: Event) => {
      const customEvent = event as CustomEvent;
      const userData = customEvent.detail;  
      const result= await this.authService.loginGoogle(userData)
      if (result != null) {
        this.responseData = result;
        
        this.cookie.setLoggedUserId(this.responseData.data.id);
        setTimeout(() => {
          const event = new CustomEvent('login');
          window.dispatchEvent(event);
        }, 100);
        this.login.emit()
        
        
       this.router.navigate(['/tela-inicial']);
      }
      
      });
 
    

    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.passwordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?-_":{}|<>]).*$/),
        ]),
        confirmationPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  goCadastro(){
    window.location.href = "tela-cadastro"
  }

  ngOnDestroy(){
    window.location.reload()
  }
  
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmationPassword = control.get('confirmationPassword')?.value;

    if (password !== confirmationPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }
  responseData : any 

 async submit() {
    try {
      const result = await this.authService.proceedLogin(this.userForm.value);
      
      if (result != null) {
        this.responseData = result;
        
        this.cookie.setLoggedUserId(this.responseData.data.id);
        setTimeout(() => {
          const event = new CustomEvent('login');
          window.dispatchEvent(event);
        }, 100);
        this.login.emit()
        
        this.router.navigate(['/tela-inicial']);
      } else {
        // Handle null result
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error
    }
  

  }

  get formControls() {
    return this.passwordForm.controls;
  }
  moveFocus(fieldName: string): void {
    const nextInput = document.querySelector(
      `input[formControlName='${fieldName}']`
    ) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }

  cadastro(): void {
    this.router.navigate(['/tela-cadastro']);
  }

  sendEmail() {
    emailjs.init('g6vzn0F8lz-YtFi-C');
    let respose = emailjs.send("service_yxnowjg","template_mj6rtvu", {
      from_name: 'Evolve',
      from_email: this.user.email,
      to_name: this.user.name,
      code:
        '' +
        this.randomNumbers[0] +
        this.randomNumbers[1] +
        this.randomNumbers[2] +
        this.randomNumbers[3] +
        this.randomNumbers[4] +
        this.randomNumbers[5],
    });
  }
  randomNumbers: number[] = [];

  generateRandomNumbers() {
    this.randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      this.randomNumbers.push(Math.floor(Math.random() * 9)); // Gera números aleatórios de 1 a 100
    }
    return this.randomNumbers;
  }
  changePassword = false;
  openChangePassword() {
    this.changePassword = true;
  }
  changeEmail = '';
  emailModal = true;
  codeModal = false;
  passwordModal = false;
  n1!: number;
  n2!: number;
  n3!: number;
  n4!: number;
  n5!: number;
  n6!: number;
  user!: User;
  validEmail = false 
  async verifyEmail() {
    this.user = await this.service.getUserByEmail(this.changeEmail);
    if (this.user.id != null) {
      this.generateRandomNumbers();
      this.sendEmail();
      this.emailModal = false;
      this.codeModal = true;
    }else{this.validEmail = true 
    }
  }
  closeModal() {
    this.changePassword = false;
    this.passwordModal = false;
    this.emailModal = true;
    this.codeModal = false;
  }
  closeMessage(){
    this.showConfirmationMessage = false 
  }
  moveFocusNumbers(
    currentInput: HTMLInputElement,
    nextInput: HTMLInputElement | null
  ): void {
    if (currentInput.value.length >= 1 && nextInput) {
      nextInput.focus();
    }
  }
  showConfirmationMessage = false;
  message = '';
  verifyCode() {
    if (
      this.n1 == this.randomNumbers[0] &&
      this.n2 == this.randomNumbers[1] &&
      this.n3 == this.randomNumbers[2] &&
      this.n4 == this.randomNumbers[3] &&
      this.n5 == this.randomNumbers[4] &&
      this.n6 == this.randomNumbers[5]
    ) {
      this.codeModal = false;
      this.passwordModal = true;
    }
  }

  passwordReset() {
    this.user.password = this.passwordForm?.get('password')?.value;
    
    this.service.patchUserPassword(this.user.id, this.user.password);
    this.closeModal();
    this.message = 'senha alterada com sucesso';
    this.showConfirmationMessage = true;
  }
}
