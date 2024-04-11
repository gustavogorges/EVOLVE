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
    console.log(taskProjectProperty)
  
    return (await axios.patch(this.URL+"task/property/"+taskId,taskProjectProperty )).data
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
    console.log("POST SERVICE");
    console.log(tarefa);
    return (await axios.post(this.URL+"task", tarefa)).data 
  }

  async putTarefa (tarefa:Task){
    console.log(tarefa);
    console.log(JSON.stringify(tarefa));
    
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

  async putUsuario (usuario:User|Pick<User, "id">){
    return (await axios.put(this.URL+"user", usuario)).data
  }

  async postEquipe (equipe:Team){
    return (await axios.post(this.URL+"team", equipe)).data
  }

  async putEquipe (equipe:Team){
    return (await axios.put(this.URL+"team", equipe)).data
  }

  async patchUserEmail(userId:number, email:string):Promise<User>{
    return (await axios.patch(this.URL+"user"+"/email/"+userId+"/"+email )).data
  }
  async patchUserName(userId:number, name:string):Promise<User>{
    return (await axios.patch(this.URL+"user"+"/name/"+userId+"/"+name )).data
  }
  async patchUserTheme(userId:number, theme:string):Promise<User>{
    return (await axios.patch(this.URL+"user"+"/theme/"+userId+"/"+theme )).data
  }
  async patchUserPassword(userId:number, password:string):Promise<User>{
    return (await axios.patch(this.URL+"user"+"/password/"+userId+"/"+password )).data
  }
  async patchUserPrimaryColor(userId:number, primaryColor:string):Promise<User>{
    let formsData = new FormData()
    formsData.append("primaryColor",primaryColor)    
    return (await axios.patch(this.URL+"user"+"/primaryColor/"+userId,formsData )).data
  }
  async patchUserSecondaryColor(userId:number, secondaryColor:string):Promise<User>{
    let formsData = new FormData()
    formsData.append("secondaryColor",secondaryColor)    
    return (await axios.patch(this.URL+"user"+"/secondaryColor/"+userId,formsData )).data
  }
  async patchUserPrimaryDarkColor(userId:number, primaryDarkColor:string):Promise<User>{
    let formsData = new FormData()
    formsData.append("primaryColor",primaryDarkColor)    
    return (await axios.patch(this.URL+"user"+"/primaryDarkColor/"+userId,formsData )).data
  }
  async patchUserSecondaryDarkColor(userId:number, secondaryDarkColor:string):Promise<User>{
    let formsData = new FormData()
    formsData.append("secondaryColor",secondaryDarkColor)    
    return (await axios.patch(this.URL+"user"+"/secondaryDarkColor/"+userId,formsData )).data
  }
  async patchImageUser(id:number, image:any){
    return (await (axios.patch(this.URL+"user/"+id, image))).data;
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