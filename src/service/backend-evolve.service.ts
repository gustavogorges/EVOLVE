import { Injectable } from '@angular/core';
import axios from 'axios';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { Team } from 'src/model/team';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';

import { Status } from 'src/model/status';
import { Property } from 'src/model/propriedade/property';
import { Priority } from 'src/model/priority';
import { PropertyValue } from 'src/model/propriedade/propertyValue';

import { Chat } from 'src/model/chat';
import { TeamChat } from 'src/model/teamChat';
import { Option } from 'src/model/propriedade/option';



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
  async getTasksByUserId( userId: number )  {
    return (await axios.get(this.URL+"task/user" + "/"+userId)).data
  }
  async getProjectsByUserId( userId: number )  {
    return (await axios.get(this.URL+"project" + "/user/"+userId)).data
  }
  async getTeamsByUserId( userId: number )  {
    return (await axios.get(this.URL+"team" + "/user/"+userId)).data
  }
  async deleteById(caminho : string, id:number){
    return (await axios.delete(this.URL+caminho + "/"+id)).data
  }

  async updateStatusList(projetoId:number,novoStatus:Status) {
    return (await axios.patch(this.URL+"project/"+projetoId, novoStatus )).data
  }
 

  async patchProperty(taskProjectProperty:Property, taskId:number) {
    return (await axios.patch(this.URL+"task/property/"+taskId,taskProjectProperty )).data
  }

  async putPropertyOption(newOption:Option) {
    return (await axios.put(this.URL+"task/property/put/option",newOption)).data
  }

  async patchPriority(priority:number,taskId:number) {
    console.log(priority);
    
    return (await axios.patch(this.URL+"task/priority/patch/"+taskId+"/"+priority)).data
  }

  async putPropertyValue(propertyId:number, propertyValue:PropertyValue) {
    return (await axios.put(this.URL+"task/property/put/"+propertyId,propertyValue)).data
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
    return (await axios.put(this.URL+"userChat", chat)).data
  }


  async postMessage (message:MessageDTO){
    (await axios.post(this.URL+"message", message)).data 
  }

  async putMessage (message:MessageDTO){
    return (await axios.put(this.URL+"message", message)).data
  }





  //retirar quando tiver websocket ou quando aprender a pegar atributos que possuem jsonIgnore sem dar stackOverflow
  async getUserChatsByUserId(id:number) : Promise<Array<UserChat>> {
    let path:string = "userChat/user/"
    
    console.log((await axios.get(this.URL+path+id)).data);
    
    return (await axios.get(this.URL+path+id)).data
  }

  async getTeamChatsByUserId(id:number) : Promise<Array<TeamChat>>{
    let path:String = "teamChat/user/";
    console.log((await axios.get(this.URL+path+id)).data);
    
    return (await axios.get(this.URL+path+id)).data
  }

}