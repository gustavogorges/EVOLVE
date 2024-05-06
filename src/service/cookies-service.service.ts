import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Team } from 'src/model/team';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from './backend-evolve.service';


@Injectable({
    providedIn: 'root'
  })

export class CookiesService {
  
  chatListTypeField = "chatListType"

  constructor(private cookieService : CookieService, private service : BackendEVOLVEService) { }
  setJWTtoken(token : any ) : void {
    this.cookieService.set('token',token);
  }
  getJWTtoken() : any {
    this.cookieService.get('token');
  }
    setLoggedUserId(user : User|null) : void {
      this.cookieService.set('loggedUserId',JSON.stringify(user?.id));
    }

     async getLoggedUser() : Promise<User> {
      return await this.service.getOne('user',JSON.parse(this.cookieService.get('loggedUserId')))
    }

    set(fieldName:string, content:any):void{
      this.cookieService.set(fieldName,JSON.stringify(content));
    }

    get(fieldName:string):any{
      return JSON.parse(this.cookieService.get(fieldName))
    }

}