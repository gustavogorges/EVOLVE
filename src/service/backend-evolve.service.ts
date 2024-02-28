import { Injectable } from '@angular/core';
import axios from 'axios';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { Team } from 'src/model/team';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { Status } from 'src/model/status';
import { TaskProjectProperty } from 'src/model/propriedade/task-project-property';
import { Priority } from 'src/model/priority';


@Injectable({
  providedIn: 'root'
})
export class BackendEVOLVEService {
  URL : string = "http://localhost:8087/"

  constructor() { }

  async getAllSomething(caminho : string){
    return (await axios.get(this.URL+caminho)).data
  }
  async getOne(caminho : string, id:number){
    return (await axios.get(this.URL+caminho + "/"+id)).data
  }
  async getUser( email: string )  {
    return (await axios.get(this.URL+"user/login" + "/"+email)).data
  }
  async deleteById(caminho : string, id:number){
    return (await axios.delete(this.URL+caminho + "/"+id)).data
  }

  async updateStatusList(projetoId:number,novoStatus:Status) {
    return (await axios.patch(this.URL+"project/"+projetoId, novoStatus )).data
  }

  async patchProperty(taskProjectProperty:TaskProjectProperty, taskId:number) {
    console.log(taskProjectProperty)
  
    return (await axios.patch(this.URL+"task/property/"+taskId,taskProjectProperty )).data
  }

  async patchPriority(priority:number,taskId:number) {
    console.log(priority);
    
    return (await axios.patch(this.URL+"task/priority/patch/"+taskId+"/"+priority)).data
  }

  async putPropertyValue(propertyId:number,taskProjectPropertyValue:TaskProjectProperty) {
    return (await axios.put(this.URL+"task/property/"+propertyId,taskProjectPropertyValue)).data
  }

  async getAllPriorities() {
    return (await axios.get(this.URL+"task/priorities")).data
  }

  async postTarefa (tarefa:Task){
    return (await axios.post(this.URL+"task", tarefa)).data 
  }

  async putTarefa (tarefa:Task){
    return (await axios.put(this.URL+"task", tarefa)).data
  }

  async postProjeto (projeto:Project){
    return (await axios.post(this.URL+"project", projeto)).data
  }

  async putProjeto (projeto:Project){
    return (await axios.put(this.URL+"project", projeto)).data
  }

  async postUsuario (usuario:User){
    return (await axios.post(this.URL+"user", usuario)).data
  }

  async putUsuario (usuario:User){
    return (await axios.put(this.URL+"user", usuario)).data
  }

  async postEquipe (equipe:Team){
    return (await axios.post(this.URL+"team", equipe)).data
  }

  async putEquipe (equipe:Team){
    return (await axios.put(this.URL+"team", equipe)).data
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