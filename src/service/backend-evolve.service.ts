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

import { Message } from 'src/model/message';
import { MessageStatus } from 'src/model/messageStatus';
import { ProjectChat } from 'src/model/projectChat';

import { Option } from 'src/model/propriedade/option';
import { Comment } from 'src/model/comment';
import { Dashboard } from 'src/model/dashboard';
import { DashBoardCharts } from 'src/model/DashBoardCharts';




@Injectable({
  providedIn: 'root'
})
export class BackendEVOLVEService {
  
  URL : string = "http://localhost:8087/"
  project$: any;

  constructor() { }

  async getAllSomething(caminho : string){
    return (await axios.get(this.URL+caminho)).data
  }
  async getOne(caminho : string, id:number){
    return (await axios.get(this.URL + caminho + "/" + id)).data
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
  async getProjectsByTeamId( teamId: number, userId: number )  {
    return (await axios.get(this.URL+"project" + "/team/"+teamId+"/"+userId)).data
  }
  async getTeamsByUserId( userId: number )  {
    return (await axios.get(this.URL+"team" + "/user/"+userId)).data
  }
  async deleteById(caminho : string, id:number){
    return (await axios.delete(this.URL+caminho + "/"+id)).data
  }

  async patchAssociate(taskId:number, associates:Array<Pick<User, "id">>) {
    return (await axios.patch(this.URL+"task/property/associates/"+taskId,associates)).data
  }

  async getAllCommentsOfTask(taskId:number) {
    return (await axios.get(this.URL+"task/comments/getAll/"+taskId)).data
  }

  async getAllCommentsOfProject(projectId:number) {
    return (await axios.get(this.URL+"project/comments/getAll/"+projectId)).data
  }

  async patchNewComment(taskId:number, newComment:Comment) {
    return (await axios.patch(this.URL+"task/comments/patch/"+taskId,newComment)).data
  }

  async patchNewCommentProject(projectId:number, newComment:Comment, userId:number) {
    return (await axios.patch(this.URL+"project/comments/patch/"+projectId+"/"+userId,newComment)).data
  }

  async deleteCommentProject(projectId:number, commentId:number, userId:number) {
    return (await axios.delete(this.URL+"project/comments/delete/"+commentId+"/"+projectId+"/"+userId)).data
  }

  async deleteComment(taskId:number, commentId:number) {
    return (await axios.delete(this.URL+"task/comments/delete/"+commentId+"/"+taskId)).data
  }

  async updateStatusList(projetoId:number,novoStatus:Status) {
    return (await axios.patch(this.URL+"project/"+projetoId, novoStatus )).data
  }
 
  async deleteStatus(projetoId:number,status:Status) {
    return (await axios.patch(this.URL+"project/"+projetoId+"/deleteStatus", status)).data
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

  async postProjeto (project:Project){
    return (await axios.post(this.URL+"project", project)).data
  }

  async putProjeto (project:Project){
    return (await axios.put(this.URL+"project", project)).data
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


  async postMessage (message:MessageDTO): Promise<Message>{
    return (await axios.post(this.URL+"message", message)).data 
  }

  async putMessage (message:MessageDTO): Promise<Message>{
    console.log("fazendo update na service");
    
    console.log(message);
    
    return (await axios.put(this.URL+"message", message)).data
  }

  async patchMessageStatus(messageId:number, newMessageStatus:string):Promise<Message>{
    return (await axios.patch(this.URL+"message" + "/" + messageId + "/" + newMessageStatus)).data
  }

  async deleteUserFromProject(idProject:number, users:Array<Pick<User, "id">>){
    return (await axios.patch(this.URL+"project" + "/" + idProject + "/" + "delete-user", users)).data
  }

  //retirar quando tiver websocket ou quando aprender a pegar atributos que possuem jsonIgnore sem dar stackOverflow
  async getUserChatsByUserId(id:number) : Promise<Array<UserChat>> {
    let path:string = "userChat/user/"
    return (await axios.get(this.URL+path+id)).data
  }

  async getTeamChatsByUserId(id:number) : Promise<Array<TeamChat>>{
    let path:String = "teamChat/user/";
    return (await axios.get(this.URL+path+id)).data
  }

  async getProjectChatsByUserId(id:number):Promise<Array<ProjectChat>>{
    let path:string = "projectChat/user/"
    return (await axios.get(this.URL+path+id)).data
  }

  async patchImage(id:number, image:any){
    return (await (axios.patch(this.URL+"project/"+id+"/setImage", image))).data;
  }

  async getCharts(idProject:number){
    return (await (axios.patch(this.URL+idProject+"/dashboard/getCharts"))).data;
  }

  async postDashboard(dashboard:Dashboard, idProject:number){
    return (await axios.post(this.URL+idProject+"/dashboard", dashboard)).data 
  }

  async getDashboards(idProject:number){
    return (await (axios.get(this.URL+idProject+"/dashboard"))).data;
  }

  async deleteDashboard(idDashboard:number){
    return (await (axios.delete(this.URL+0+"/dashboard/"+idDashboard))).data;
  }

  async updateDashboard(dashboard:Dashboard, idDashboard:number, idProject:number){
    return (await (axios.put(this.URL+idProject+"/dashboard/"+idDashboard, dashboard))).data;
  }

  async setChartToDash(idDashboard:number, idProject:number, chart:DashBoardCharts){
    return (await (axios.patch(this.URL+idProject+"/dashboard/"+idDashboard, chart))).data;
  }

  async updateChartList(idDashboard:number, idProject:number, charts:Array<DashBoardCharts>){
    return (await (axios.patch(this.URL+idProject+"/dashboard/"+idDashboard+"/updateChartList", charts))).data;
  }

  async deleteChart(idDashboard:number, idChart:number, idProject:number){
    return (await (axios.delete(this.URL+idProject+"/dashboard/"+idDashboard+"/delete-chart/"+idChart))).data;
  }

}