import { Injectable } from '@angular/core';
import axios from 'axios';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { Equipe } from 'src/model/equipe';
import { Projeto } from 'src/model/projeto';
import { Tarefa } from 'src/model/tarefa';
import { UserChat } from 'src/model/userChat';
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
  async getUser( email: string )  {
    return (await axios.get(this.URL+"usuario/login" + "/"+email)).data
  }
  async deleteById(caminho : string, id:number){
    return (await axios.delete(this.URL+caminho + "/"+id)).data
  }

  async postTarefa (tarefa:Tarefa){
    (await axios.post(this.URL+"tarefa", tarefa)).data 
  }

  async putTarefa (tarefa:Tarefa){
    return (await axios.put(this.URL+"tarefa", tarefa)).data
  }

  async postProjeto (projeto:Projeto){
    return (await axios.post(this.URL+"projeto", projeto)).data
  }

  async putProjeto (projeto:Projeto){
    return (await axios.put(this.URL+"projeto", projeto)).data
  }

  async postUsuario (usuario:Usuario){
    return (await axios.post(this.URL+"usuario", usuario)).data
  }

  async putUsuario (usuario:Usuario){
    return (await axios.put(this.URL+"usuario", usuario)).data
  }

  async postEquipe (equipe:Equipe){
    return (await axios.post(this.URL+"equipe", equipe)).data
  }

  async putEquipe (equipe:Equipe){
    return (await axios.put(this.URL+"equipe", equipe)).data
  }



  async postUserChat (chat:UserChat){
    (await axios.post(this.URL+"userChat", chat)).data 
  }

  async putUserChat (chat:UserChat){
    console.log("Eu cheguei aqui")
    return (await axios.put(this.URL+"userChat", chat)).data
  }


  async postMessage (message:MessageDTO){
    (await axios.post(this.URL+"message", message)).data 
  }

  async putMessage (message:MessageDTO){
    return (await axios.put(this.URL+"message", message)).data
  }





  //retirar quando tiver websocket ou quando aprender a pegar atributos que possuem jsonIgnore sem dar stackOverflow
  async getChatsByUserId(id:number) {
    let path:string = "userChat/user/" 
    console.log((await axios.get(this.URL+path+id)).data)
    return (await axios.get(this.URL+path+id)).data
  }

}