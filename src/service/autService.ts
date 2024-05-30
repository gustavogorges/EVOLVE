
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user';
import { CookieService } from 'ngx-cookie-service';
import axios, { AxiosResponse } from 'axios';
import { EventEmitter, Injectable } from "@angular/core";
import { CookiesService } from "./cookies-service.service";
import { Observable, Subject } from 'rxjs';
import { USE_DEFAULT_LANG } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  loggedInChanged = new EventEmitter<boolean>();
  
  constructor(private http: HttpClient, private cookies: CookieService) {
  
  }

  async proceedLogin(userlogin: any): Promise<AxiosResponse<User>> {
    try {
      const response = await axios.post<User>('http://localhost:8087/auth/login', {email:userlogin.username, password:userlogin.password}, { withCredentials: true });
        
      const jwtCookie = response.headers['set-cookie'];
      if (jwtCookie) {
        const value = jwtCookie[0].split(';')[0].split('=')[1];
        const maxAge = jwtCookie[0].split(';')[1].split('=')[1];
        const path = '/';
        this.cookies.set('EV', value, parseInt(maxAge), path);
      }
      

      return response;
    } catch (error) {
      setTimeout(() => {
        const event = new CustomEvent('erroModal', { detail: "Usuário não encontrado ou senha incorreta!" });
        window.dispatchEvent(event);
      }, 100);
      console.error('Erro ao fazer login:', error);
      throw error;

    }
  }


  isLoggedIn() {
    return  this.cookies.get('EV')!="" && this.cookies.get('EV')!=null;
  }
 
  loginGoogle(userData : any){
   const aaa : AAA = {
    username : userData.email, 
    password :''
   };
    
   return this.proceedLogin(aaa); 
  }
 
 
}
 interface AAA {
  username: string;
  password: string;
};
