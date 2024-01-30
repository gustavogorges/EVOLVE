import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Team } from 'src/model/team';
import { Projeto } from 'src/model/project';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from './backend-evolve.service';


@Injectable({
    providedIn: 'root'
  })

export class CookiesService {
  

  constructor(private cookieService : CookieService, private service : BackendEVOLVEService) { }

    setOne(usuario : User) : void {
        this.cookieService.set('loggedUserId',JSON.stringify(usuario.id));
    }

     async getLoggedUser() : Promise<User> {
        return  await this.service.getOne('usuario',JSON.parse(this.cookieService.get('loggedUserId')))
        
    }

  

}