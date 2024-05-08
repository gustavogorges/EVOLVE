import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/model/user';
import { CookieService } from 'ngx-cookie-service';
import axios, { AxiosResponse } from 'axios';
import { sortedUniq } from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private cookies: CookieService) {}
  async proceedLogin(userlogin: any): Promise<AxiosResponse<User>> {
    try {

      const response = await axios.post<User>('http://localhost:8087/auth/login', userlogin, { withCredentials: true });
        // console.log(response);
        
      const jwtCookie = response.headers['set-cookie'];
      if (jwtCookie) {
        const value = jwtCookie[0].split(';')[0].split('=')[1];
        const maxAge = jwtCookie[0].split(';')[1].split('=')[1];
        const path = '/';
        this.cookies.set('EV', value, parseInt(maxAge), path);
      }

      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }


  isLoggedIn() {
    console.log(this.cookies.get('token'));

    return  this.cookies.get('EV') != null;
  }
}
