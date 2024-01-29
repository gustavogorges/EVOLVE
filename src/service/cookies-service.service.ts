import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Equipe } from 'src/model/equipe';
import { Projeto } from 'src/model/projeto';
import { Tarefa } from 'src/model/tarefa';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from './backend-evolve.service';


@Injectable({
    providedIn: 'root'
  })

export class CookiesService {
  

  constructor(private cookieService : CookieService, private service : BackendEVOLVEService) { }

    setOne(usuario : Usuario) : void {
        this.cookieService.set('loggedUserId',JSON.stringify(usuario.id));
    }

     async getLoggedUser() : Promise<Usuario> {
        return  await this.service.getOne('usuario',JSON.parse(this.cookieService.get('loggedUserId')))
        
    }

  

}