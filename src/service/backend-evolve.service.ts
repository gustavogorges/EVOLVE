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
import { PriorityRecord } from 'src/model/PriorityRecord';
import { Subtask } from 'src/model/subtask';
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

  async patchAssociate(taskId:number, associates:Array<Pick<User, "id">>, userId:number) {
    return (await axios.patch(this.URL+"task/property/associates/"+taskId+"/"+userId,associates)).data
  }

  async removeAssociate(taskId:number, removedAssociate : number, userId:number) {
    return (await axios.delete(this.URL+"task/property/associates/delete/"+taskId+"/"+userId+"/"+removedAssociate)).data
  }

  async getAllCommentsOfTask(taskId:number) {
    return (await axios.get(this.URL+"task/comments/getAll/"+taskId)).data
  }


  async patchNewComment(taskId:number, newComment:Comment, userId:number) {
    return (await axios.patch(this.URL+"task/comments/patch/"+taskId+"/"+userId,newComment)).data
  }

  async deleteComment(taskId:number, commentId:number, userId:number) {
    return (await axios.delete(this.URL+"task/comments/delete/"+commentId+"/"+taskId+"/"+userId)).data
  }
  async getAllCommentsOfProject(projectId:number) {
    return (await axios.get(this.URL+"project/comments/getAll/"+projectId)).data
  }

  
  async patchNewCommentProject(projectId:number, newComment:Comment, userId:number) {
    return (await axios.patch(this.URL+"project/comments/patch/"+projectId+"/"+userId,newComment)).data
  }

  async deleteCommentProject(projectId:number, commentId:number, userId:number) {
    return (await axios.delete(this.URL+"project/comments/delete/"+commentId+"/"+projectId+"/"+userId)).data
  }


  async updateStatusList(projetoId:number,actionsUserId:number, novoStatus:Status) {
    return (await axios.patch(this.URL+"project/"+projetoId+"/"+actionsUserId, novoStatus )).data
  }
 
  async deleteStatus(projetoId:number,status:Status) {
    return (await axios.patch(this.URL+"project/"+projetoId+"/deleteStatus", status)).data
  }

  async patchProperty(taskProjectProperty:Property, taskId:number, userId:number) {
    return (await axios.patch(this.URL+"task/property/"+taskId+"/"+userId,taskProjectProperty )).data
  }

  async updateCurrentStatus(taskId:number, userId:number, newStatus:Status) {
    return (await axios.patch(this.URL+"task/update/"+taskId+"/currentStatus/"+userId, newStatus)).data
  }

  async updateCurrentPriority(taskId:number, userId:number, newPriority:PriorityRecord) {
    return (await axios.patch(this.URL+"task/update/"+taskId+"/"+userId+"/currentPriority", newPriority)).data
  }

  async putPropertyOption(newOption:Option, userId:number, taskId:number, propertyId:number) {
    return (await axios.put(this.URL+"task/property/put/option/"+userId+"/"+taskId+"/"+propertyId,newOption)).data
  }

  async deletePropertyOption(optionId:number, userId:number, taskId:number, propertyId:number) {
    return (await axios.delete(this.URL+"task/property/delete/option/"+userId+"/"+taskId+"/"+propertyId+"/"+optionId)).data
  }

  async patchSubtask(subtask : Subtask, taskId:number, userId:number) {
    return (await axios.patch(this.URL+"task/subtask/"+taskId+"/"+userId,subtask)).data
  }

  async deleteSubtask(subtaskId:number, taskId:number, userId:number) {
    return (await axios.delete(this.URL+"task/subtask/delete/"+subtaskId+"/"+taskId+"/"+userId)).data
  }

  async patchPriority(priority:number,taskId:number) {
    console.log(priority);
    
    return (await axios.patch(this.URL+"task/priority/patch/"+taskId+"/"+priority)).data
  }

  async putPropertyValue(propertyId:number, propertyValue:PropertyValue, userId:number, taskId:number) {
    return (await axios.put(this.URL+"task/property/put/"+propertyId+"/"+userId+"/"+taskId,propertyValue)).data
  }

  async getAllPriorities() {
    return (await axios.get(this.URL+"task/priorities")).data
  }

  async postTarefa (tarefa:Task){
    return (await axios.post(this.URL+"task", tarefa)).data 
  }

  async putTarefa (tarefa:Task, userId:number){
    return (await axios.put(this.URL+"task/"+userId, tarefa)).data
  }

  async postProjeto (project:Project){
    return (await axios.post(this.URL+"project", project)).data
  }

  async putProjeto (project:Project){
    return (await axios.put(this.URL+"project", project)).data
  }

  async postUsuario (usuario:User){
    return (await axios.post(this.URL+"user", usuario)).status
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
  async patchUserFontSize(userId:number, fontSize:number):Promise<User>{
    return (await axios.patch(this.URL+"user"+"/fontSize/"+userId+"/"+fontSize )).data
  }
  async patchImageUser(id:number, image:any){
    return (await (axios.patch(this.URL+"user/"+id, image))).data;
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

  async deleteProperty(taskId:number, userId:number, propertyId:number) {
    return (await axios.delete(this.URL+"task/property/delete/"+taskId+"/"+userId+"/"+propertyId)).data
  }

  async updateTaskName(taskId:number, userId:number, newName:string) {
    return (await axios.patch(this.URL+"task/update/"+taskId+"/name/"+userId+"/"+newName)).data
  }

  async updatePropertyOptions(taskId:number, userId:number, propertyId:number, newOptions:Array<Option>) {
    return (await axios.patch(this.URL+"task/update/"+taskId+"/currentOptions/"+userId+"/"+propertyId,newOptions)).data
  }

  async updateTaskFinalDate(taskId:number, userId:number, newDate:Date) {
    return (await axios.put(this.URL+"task/update/finalDate/"+taskId+"/"+userId+"/calendar/"+newDate)).data
  }

  async updateTaskScheludeDate(taskId:number, userId:number, newDate:Date)  {
    return (await axios.patch(this.URL+"task/update/"+taskId+"/scheludeDate/"+userId+"/calendar/"+newDate)).data
  }

  async deleteTask(taskId:number) {
    return (await axios.delete(this.URL+"task/delete/"+taskId)).data
  }

  async patchTaskFile(taskId:number, userId:number, file:File) {
    let formData = new FormData()
    formData.append("file",file)
    return (await axios.patch(this.URL+"task/patch/task/file/"+taskId+"/"+userId,formData)).data
  }

  async deleteTaskFile(taskId:number, fileId:number,userId:number) {
    return (await axios.delete(this.URL+"task/delete/task/file/"+taskId+"/"+fileId+"/"+userId)).data
  }

  async getCharts(idProject:number){
    return (await (axios.patch(this.URL+idProject+"/dashboard/getCharts"))).data;
  }

  async postDashboard(dashboard:Dashboard, idProject:number, actionUserId:number){
    return (await axios.post(this.URL+idProject+"/dashboard/"+actionUserId, dashboard)).data 
  }

  async getDashboards(idProject:number){
    return (await (axios.get(this.URL+idProject+"/dashboard"))).data;
  }

  async deleteDashboard(idDashboard:number, idActionUser:number){
    return (await (axios.delete(this.URL+0+"/dashboard/"+idDashboard+"/"+idActionUser))).data;
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


  async patchReadedNotification(teamId:number, notificationId:number) {
    return (await axios.patch(this.URL+"team/"+teamId+"/"+notificationId)).data
  }

  async cleanAllUserNotifications(userId:number) {
    return (await axios.delete(this.URL+"team/clean/"+userId)).data
  }

  async updateDashboardName(idDashboard:number, idProject:number, dashboard:Dashboard){
    return (await (axios.put(this.URL+idProject+"/dashboard/"+idDashboard+"/updateName", dashboard))).data;
  }

  async updateNameDescProject(idProject:number, projectNameDescDTO:any){
    return (await (axios.patch(this.URL+"/project/"+idProject+"/altereteName", projectNameDescDTO))).data;
  }

}