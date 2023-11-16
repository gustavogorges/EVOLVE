import { Injectable } from '@angular/core';
import axios from 'axios';
import { Equipe } from 'src/model/equipe';
import { Projeto } from 'src/model/projeto';
import { Tarefa } from 'src/model/tarefa';
import { Usuario } from 'src/model/usuario';


@Injectable({
  providedIn: 'root'
})
export class BackendEVOLVEService {
  URL : string = "http://10.4.96.2:8087/"

  constructor() { }

  async getAllSomething(caminho : string){
    console.log((await axios.get(this.URL+caminho)).data);
    return (await axios.get(this.URL+caminho)).data
  }
  async getOne(caminho : string, id:number){
    return (await axios.get(this.URL+caminho + "/"+id)).data
  }
  async deleteById(caminho : string, id:number){
    return (await axios.delete(this.URL+caminho + "/"+id)).data
  }

  async postTarefa (caminho : string, tarefa:Tarefa){
    (await axios.post(this.URL+caminho, tarefa)).data 
  }

  async putTarefa (caminho : string, tarefa:Tarefa){
    return (await axios.put(this.URL+caminho, tarefa)).data
  }

  async postProjeto (caminho : string, projeto:Projeto){
    return (await axios.post(this.URL+caminho, projeto)).data
  }

  async putProjeto (caminho : string, projeto:Projeto){
    return (await axios.put(this.URL+caminho, projeto)).data
  }

  async postUsuario (caminho : string, usuario:Usuario){
    return (await axios.post(this.URL+caminho, usuario)).data
  }

  async putUsuario (caminho : string, usuario:Usuario){
    return (await axios.put(this.URL+caminho, usuario)).data
  }

  async postEquipe (caminho : string, equipe:Equipe){
    return (await axios.post(this.URL+caminho, equipe)).data
  }

  async putEquipe (caminho : string, equipe:Equipe){
    return (await axios.put(this.URL+caminho, equipe)).data
  }

}