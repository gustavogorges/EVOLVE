import { Injectable } from '@angular/core';
import axios, { AxiosHeaders } from 'axios';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { Team } from 'src/model/team';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';

import { Status } from 'src/model/status';
import { Property } from 'src/model/propriedade/property';
import { PropertyValue } from 'src/model/propriedade/propertyValue';

import { TeamChat } from 'src/model/teamChat';

import { Message } from 'src/model/message';
import { ProjectChat } from 'src/model/projectChat';

import { Option } from 'src/model/propriedade/option';
import { Comment } from 'src/model/comment';
import { PriorityRecord } from 'src/model/priorityRecord';
import { Subtask } from 'src/model/subtask';
import { Dashboard } from 'src/model/dashboard';
import { DashBoardCharts } from 'src/model/DashBoardCharts';
<<<<<<< HEAD
import { UserProject } from 'src/model/userProject';
import { Role } from 'src/model/Role';
=======
import { UsuarioTarefa } from 'src/model/userTask';



>>>>>>> dev

@Injectable({
  providedIn: 'root',
})
export class BackendEVOLVEService {
  URL: string = 'http://localhost:8087/';

  constructor() { }

  //#region Generics

  async getAllSomething(caminho: string) {
    return (await axios.get(this.URL + caminho, {withCredentials: true})).data;
  }

  async getOne(caminho: string, id: number) {
    return (
      await axios.get(this.URL + caminho + '/' + id, { withCredentials: true })
    ).data;
  }

<<<<<<< HEAD
  async deleteById(caminho: string, id: number) {
    return (await axios.delete(this.URL + caminho + '/' + id, {withCredentials: true})).data;
=======
  async removeAssociate(taskId:number, removedAssociate : number, userId:number) {
    return (await axios.delete(this.URL+"task/property/associates/delete/"+taskId+"/"+userId+"/"+removedAssociate)).data
  }

  async getAllCommentsOfTask(taskId:number) {
    return (await axios.get(this.URL+"task/comments/getAll/"+taskId)).data
>>>>>>> dev
  }

  //#endregion Generics

  //#region User

  async getUserByEmail(email: string) {
    return (await axios.get(this.URL + 'user/login' + '/' + email, {withCredentials: true})).data;
  }

  async postUsuario(usuario: User) {
    return (await axios.post(this.URL + 'user', usuario, {withCredentials: true}));
  }

<<<<<<< HEAD
  async patchUserEmail(userId: number, email: string): Promise<User> {
    let formsData = new FormData();
    formsData.append('email', email);
    return (
      await axios.patch(`${this.URL}user/${userId}/email`, formsData, {withCredentials: true})
    ).data;
  }
  async patchUserName(userId: number, name: string): Promise<User> {
    let formsData = new FormData();
    formsData.append('name', name);
    return (
      await axios.patch(`${this.URL}user/${userId}/name`, formsData ,{withCredentials: true})
    ).data;
  }
  async patchUserTheme(userId: number, theme: string): Promise<User> {
    let formsData = new FormData();
    formsData.append('theme', theme);
    return (
      await axios.patch(this.URL + 'user/' + userId + '/theme' , formsData, {withCredentials: true})
    ).data;
=======
  
  async patchNewCommentProject(projectId:number, newComment:Comment, userId:number) {
    return (await axios.patch(this.URL+"project/comments/patch/"+projectId+"/"+userId,newComment)).data
>>>>>>> dev
  }

  async patchUserPassword(userId: number, password: string): Promise<User> {
    let formsData = new FormData();
    formsData.append('password', password);
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/password', formsData, {withCredentials: true}
      )
    ).data;
  }
  async patchUserPrimaryColor(
    userId: number,
    primaryColor: string
  ): Promise<User> {
    let formsData = new FormData();
    formsData.append('primaryColor', primaryColor);
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/primaryColor',
        formsData, {withCredentials: true}
      )
    ).data;
  }
  async patchUserSecondaryColor(
    userId: number,
    secondaryColor: string
  ): Promise<User> {
    let formsData = new FormData();
    formsData.append('secondaryColor', secondaryColor);
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/secondaryColor',
        formsData, {withCredentials: true}
      )
    ).data;
  }

<<<<<<< HEAD
  async patchUserPrimaryDarkColor(
    userId: number,
    primaryDarkColor: string
  ): Promise<User> {
    let formsData = new FormData();
    formsData.append('primaryColor', primaryDarkColor);
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/primaryDarkColor',
        formsData, {withCredentials: true}
      )
    ).data;
=======

  async updateStatusList(projetoId:number,actionsUserId:number, novoStatus:Status) {
    return (await axios.patch(this.URL+"project/"+projetoId+"/"+actionsUserId, novoStatus )).data
>>>>>>> dev
  }
  async patchUserSecondaryDarkColor(
    userId: number,
    secondaryDarkColor: string
  ): Promise<User> {
    let formsData = new FormData();
    formsData.append('secondaryColor', secondaryDarkColor);
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/secondaryDarkColor',
        formsData, {withCredentials: true}
      )
    ).data;
  }
  async patchUserFontSize(userId: number, fontSize: number): Promise<User> {
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/fontSize' + '/' + fontSize, {withCredentials: true}
      )
    ).data;
  }
  async patchImageUser(id: number, image: any) {
    return (await axios.patch(this.URL + 'user/' + id, image, {withCredentials: true})).data;
  }

  //#endregion User

  //#region Task

  async getTasksByUserId(userId: number) {
    return (
      await axios.get(this.URL + 'task/user' + '/' + userId, {
        withCredentials: true,
      })
    ).data;
  }

  async patchAssociate(
    taskId: number,
    associates: Array<Pick<User, 'id'>>,
    userId: number
  ) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/property/associates/' + userId,
        associates, {withCredentials: true}
      )
    ).data;
  }

  async getAllCommentsOfTask(taskId: number) {
    return (await axios.get(this.URL + 'task/' + taskId + '/comments/getAll', {withCredentials: true})).data;
  }

  async patchNewComment(taskId: number, newComment: Comment, userId: number) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + 'comments/patch/user/' + userId,
        newComment, {withCredentials: true}
      )
    ).data;
  }

  async deleteComment(taskId: number, commentId: number, userId: number) {
    return (
      await axios.delete(
        this.URL +
        'task/' + taskId +
        '/comments/delete/' +
        commentId +
        '/user/' +
        userId, {withCredentials: true}
      )
    ).data;
  }

  async patchProperty(
    taskProjectProperty: Property,
    taskId: number,
    userId: number
  ) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/property' + '/' + userId,
        taskProjectProperty, {withCredentials: true}
      )
    ).data;
  }

  async updateCurrentStatus(taskId: number, userId: number, newStatus: Status) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/update' + '/currentStatus/user/' + userId,
        newStatus, {withCredentials: true}
      )
    ).data;
  }

  async updateCurrentPriority(
    taskId: number,
    userId: number,
    newPriority: PriorityRecord
  ) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/user' + '/' + userId + '/update' + '/currentPriority',
        newPriority, {withCredentials: true}
      )
    ).data;
  }

  async putPropertyOption(
    newOption: Option,
    userId: number,
    taskId: number,
    propertyId: number
  ) {
    return (
      await axios.put(
        this.URL +
        'task' + '/' +
        taskId + '/property/put/option/' +
        userId +
        '/' +
        propertyId,
        newOption, {withCredentials: true}
      )
    ).data;
  }

  async deletePropertyOption(
    optionId: number,
    userId: number,
    taskId: number,
    propertyId: number
  ) {
    return (
      await axios.delete(
        this.URL +
        'task' + '/' +
        taskId +
        '/property/delete/option/' +
        userId +
        '/' +
        propertyId +
        '/' +
        optionId, {withCredentials: true}
      )
    ).data;
  }

  async patchSubtask(subtask: Subtask, taskId: number, userId: number) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/subtask/' + userId,
        subtask, {withCredentials: true}
      )
    ).data;
  }

  async deleteSubtask(subtaskId: number, taskId: number, userId: number) {
    return (
      await axios.delete(
        this.URL +
        'task' + '/' +
        taskId +
        '/subtask/delete/' +
        subtaskId +
        '/' +
        userId, {withCredentials: true}
      )
    ).data;
  }

  async patchPriority(priority: number, taskId: number) {
    console.log(priority);

    return (
      await axios.patch(
        this.URL + 'task/priority/patch/' + taskId + '/' + priority, {withCredentials: true}
      )
    ).data;
  } //not found in API


  async putPropertyValue(
    propertyId: number,
    propertyValue: PropertyValue,
    userId: number,
    taskId: number
  ) {
    return (
      await axios.put(
        this.URL +
        'task' +
        '/' +
        taskId + '/property/put/' +
        propertyId +
        '/' +
        userId,
        propertyValue, {withCredentials: true}
      )
    ).data;
  }

  async getAllPriorities(projectId: number) {
    return (await axios.get(this.URL + 'task/' + projectId + '/priorities', {withCredentials: true})).data;
  }

  async postTarefa(tarefa: Task) {
    return (await axios.post(this.URL + 'task', tarefa, {withCredentials: true})).data;
  }

  async putTarefa(tarefa: Task, userId: number) {
    return (await axios.put(this.URL + 'task/user/' + userId, tarefa, {withCredentials: true})).data;
  }

  //parei aqui 08/05/2024

  async deleteProperty(taskId: number, userId: number, propertyId: number) {
    return (
      await axios.delete(
        this.URL +
          'task/' + taskId +
          '/' + 'property/delete/user/' +
        userId +
        '/' +
        propertyId, {withCredentials: true}
      )
    ).data;
  }

  async updateTaskName(taskId: number, userId: number, newName: string) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/update/user/' + userId + + '/name/' + newName, {withCredentials: true}
      )
    ).data;
  }

  async updatePropertyOptions(
    taskId: number,
    userId: number,
    propertyId: number,
    newOptions: Array<Option>
  ) {
    return (
      await axios.patch(
        this.URL +
          'task/' + taskId + '/update' +

          '/currentOptions/uuser/' +
          userId +
          '/property/' +
          propertyId,
        newOptions, {withCredentials: true}
      )
    ).data;
  }

  async updateTaskFinalDate(taskId: number, userId: number, newDate: Date) {
    return (
      await axios.put(
        this.URL +
          'task/'+           taskId +
          '/' + 'update/finalDate/' +

          userId +
          '/calendar/' +
          newDate, {withCredentials: true}

      )
    ).data;
  }

  async deleteTask(taskId: number) {
    return (await axios.delete(this.URL + 'task/' + taskId + '/delete', {withCredentials: true})).data;
  }

  async patchTaskFile(taskId: number, userId: number, file: any) {
    let formData = new FormData();
    formData.append('file', file);
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/patch/task/file/' + userId,
        formData, {withCredentials: true}
      )
    ).data;
  }

  async deleteTaskFile(taskId: number, fileId: number, userId: number) {
    return (
      await axios.delete(this.URL + "task/"+taskId+"/delete/file/"+fileId+"/"+userId, {withCredentials: true})
    ).data;
  }

  //#endregion Task

  //#region Project

  async getProjectsByUserId(userId: number) {
    return (await axios.get(this.URL + 'project' + '/user/' + userId, { withCredentials: true })).data;
  }
  async getProjectsByTeamId(teamId: number) {
    console.log((
      await axios.get(this.URL + 'project' + '/team/' + teamId, { withCredentials: true })
    ).data);
    
    return (
      await axios.get(this.URL + 'project' + '/team/' + teamId, { withCredentials: true })
    ).data;
  }

  async getAllCommentsOfProject(projectId: number) {
    return (await axios.get(this.URL + 'project/comments/getAll/' + projectId, {withCredentials: true}))
      .data;
  } //not found in projectController on API

  async patchNewCommentProject(
    projectId: number,
    newComment: Comment,
    userId: number
  ) {
    return (
      await axios.patch(
        this.URL + 'project/comments/patch/' + projectId + '/' + userId,
        newComment, {withCredentials: true}
      )
    ).data;
  } //not found in projectController on API

  async deleteCommentProject(
    projectId: number,
    commentId: number,
    userId: number
  ) {
    return (
      await axios.delete(
        this.URL +
        'project/comments/delete/' +
        commentId +
        '/' +
        projectId +
        '/' +
        userId, {withCredentials: true}
      )
    ).data;
  } //not found in projectController on API

  async postProjeto(project: Project, teamId: number) {
    return (await axios.post(this.URL + 'project/team/' + teamId, project, {withCredentials: true})).data;
  }

  async putProjeto(project: Project) {
    //falta fazer aqui
    this.patchProjectName(project.id, project.name); 
  
    this.patchProjectDescription(project.id, project.description);

    // this.patchProjectImage(project.id, project.image); 
  
    // this.patchProjectImageRemove(project.id);
  
    this.patchProjecyImageColor(project.id, project.imageColor); 
  
    // this.patchProjectFinalDate(project.id, project.finalDate);
  
    // this.patchProjectStatusList(project.id, project.statusList); 
  
    // this.patchProjectMembers(project.id, project.members); 
  
    this.patchProjectTasks(project.id, project.tasks);
  
    // this.patchDefaultRole(project.id, project.defaultRole)

    return await this.getOne("project", project.id)
  }

  async updateStatusList(projetoId: number, statusList: Array<Status>) {
    return (await axios.patch(this.URL + 'project/' + projetoId + "/statusList", statusList, {withCredentials: true}))
      .data;
  }

  async deleteStatus(projetoId: number, statusId: number) {
    return (
      await axios.patch(
        this.URL + 'project/' + projetoId + '/statusList/remove/' + statusId, {withCredentials: true})
    ).data;
  }

<<<<<<< HEAD
  async patchProjectName(projectId: number, newName: string):Promise<Project> {
    let formData: FormData = new FormData;
    formData.append("name", newName);
=======
  async postProjeto (project:Project){
    return (await axios.post(this.URL+"project", project)).data
  }

  async putProjeto (project:Project,actionUserId:number){
    return (await axios.put(this.URL+"project/"+actionUserId, project)).data
  }

  async postUsuario (usuario:User){
    return (await axios.post(this.URL+"user", usuario)).status
  }

  async putUsuario (usuario:User|Pick<User, "id">){
    return (await axios.put(this.URL+"user", usuario)).data
  }

  async postEquipe (equipe:Team){
    console.log(equipe);
    
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
>>>>>>> dev
    
    return (
      await axios.patch(this.URL + "project/" + projectId + "/name", formData, {withCredentials: true})
    ).data
  }

  async patchProjectDescription(projectId: number, description: string):Promise<Project> {
    let formData: FormData = new FormData;
    formData.append("description", description);
    //não tirar
    console.log((
      await axios.patch(this.URL + "project/" + projectId + "/description", formData, {withCredentials: true})
    ).data);
    
    return await this.getOne("project", projectId)
  }

  async patchProjectImage(id: number, image: any) {
    let formData = new FormData
    formData.append("image", image)
    return (await axios.patch(this.URL + 'project/' + id + '/image', formData, {withCredentials: true}))
      .data;
  }

<<<<<<< HEAD
  async patchProjectImageRemove(projectId: number) {
    return (
      await axios.patch(this.URL + "project/" + projectId + "/image/remove", {withCredentials: true})
    ).data;
=======
  async deleteUserFromProject(idProject:number, actionUserId:number, users:Array<Pick<User, "id">>){
    return (await axios.patch(this.URL+"project" + "/" + idProject + "/" + "delete-user/"+actionUserId, users)).data
>>>>>>> dev
  }

  async patchProjecyImageColor(projecId: number, imageColor: string) {
    let formData: FormData = new FormData;
    formData.append("imageColor", imageColor);
    return (
      await axios.patch(this.URL + "project/" + projecId + "/imageColor", formData, {withCredentials: true})
    ).data
  }

  async patchProjectFinalDate(projecId: number, finalDate: string) {
    let formData: FormData = new FormData;
    formData.append("finalDate", finalDate);
    return (
      await axios.patch(this.URL + "project/" + projecId + "/finalDate", formData, {withCredentials: true})
    ).data;
  }

  async patchProjectStatusList(projecId: number, statusList: Status[]) {
    return (
      await axios.patch(this.URL + "project/" + projecId + "/statusList", statusList, {withCredentials: true})
    ).data;
  }

  async patchProjectStatusListRemove(projecId: number, statusId: number) {
    return (
      await axios.patch(this.URL + "project/" + projecId + "/statusList/remove" + statusId, {withCredentials: true})
    ).data;
  }

  async patchProjectMembers(projectId: number, members: UserProject[]) {
    return (await axios.patch(this.URL + 'project/' + projectId + "/members", members, { withCredentials: true })
    ).data;
  }

  async patchProjectTasks(projectId: number, tasks: Task[]) {
    return (
      await axios.patch(this.URL + "project/" + projectId + "/tasks", tasks, {withCredentials: true})
    ).data
  }

  async patchProjectTasksRemove(projectId: number, taskId: number) {
    return (
      await axios.patch(this.URL + "project/" + projectId + "/task/remove/" + taskId, {withCredentials: true})
    ).data;
  }

  async patchDefaultRole(projecId: number, defaultRole: Role) {
    console.log(defaultRole);
    
    return (
      await axios.patch(this.URL + "project/" + projecId + "/defaultRole", defaultRole, {withCredentials: true})
    )
  }
  //#endregion project

  //#region Team

  async getTeamsByUserId(userId: number) {
    
    return (await axios.get(this.URL + 'team/user/' + userId, { withCredentials: true })).data;
  }

  async postEquipe(equipe: Team) {
    return (await axios.post(this.URL + 'team', equipe, {withCredentials: true})).data;
  }

  async putEquipe(equipe: Team) {
    return (await axios.put(this.URL + 'team', equipe, {withCredentials: true})).data;
  }

  async patchReadedNotification(teamId: number, notificationId: number) {
    return (
      await axios.patch(this.URL + 'team/' + teamId + '/' + notificationId, {withCredentials: true})
    ).data;
  }

  async patchName(teamId: number, newName: String) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/" + newName, {withCredentials: true})
    ).data;
  }

  async patchTeamImage(teamId: number, image: any) {
    let formData: FormData = new FormData;
    formData.append("image", image);
    return (
      await axios.patch(this.URL + "team/" + teamId + "/" + "image", formData, {withCredentials: true})
    ).data;
  }

  async patchTeamImageRemove(teamId: number) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/image/remove", {withCredentials: true})
    ).data;
  }

  async patchTeamImageColor(teamId: number, newImageColor: string) {
    let formData: FormData = new FormData;
    formData.append("imageColor", newImageColor);
    return (
      await axios.patch(this.URL + "team/" + teamId + "/imagecolor", formData, {withCredentials: true})
    ).data;
  }

  async patchTeamParticipants(teamId: number, participants: User[]) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/participants", participants, {withCredentials: true})
    ).data;
  }

  async patchTeamRoles(teamId: number, roles: Role[]) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/roles", roles, {withCredentials: true})
    ).data;
  }

  async patchTeamDefaultRole(teamId: number, defaultRole: Role) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/defaultRole", defaultRole, {withCredentials: true})
    ).data;
  }

  async cleanAllUserNotifications(userId: number) {
    return (await axios.delete(this.URL + 'team/clean/' + userId, {withCredentials: true})).data;
  }

  //#endregion Team

  //#region userChat

  async postUserChat(chat: UserChat) {
    (await axios.post(this.URL + 'userChat', chat, {withCredentials: true})).data;
  }

  async putUserChat(chat: UserChat, userId:number) {
    return (await axios.put(this.URL + `userChat/${chat.id}/user/${userId}`, chat, {withCredentials: true})).data;
  }


  //retirar quando tiver websocket ou quando aprender a pegar atributos que possuem jsonIgnore sem dar stackOverflow
  async getUserChatsByUserId(id: number): Promise<Array<UserChat>> {
    return (await axios.get(this.URL + "userChat/user/" + id, {withCredentials: true})).data;
  }

  //#endregion userChat

  //#region teamChat

  async getTeamChatsByUserId(id: number): Promise<Array<TeamChat>> {
    return (await axios.get(this.URL + "teamChat/user/" + id, {withCredentials: true})).data;
  }

  //#endregion teamChat

  //#region projectChat

  async getProjectChatsByUserId(id: number): Promise<Array<ProjectChat>> {
    return (await axios.get(this.URL + "projectChat/user/" + id, {withCredentials: true})).data;
  }

  //#endregion projectChat

  //#region message

  async postMessage(message: MessageDTO): Promise<Message> {
    return (await axios.post(this.URL + 'message', message, {withCredentials: true})).data;
  }

  async putMessage(message: MessageDTO): Promise<Message> {
    console.log('fazendo update na service');

    console.log(message);

    return (await axios.put(this.URL + 'message', message, {withCredentials: true})).data;
  }

  async patchMessageStatus(
    messageId: number,
    newMessageStatus: string
  ): Promise<Message> {
    return (
      await axios.patch(
        this.URL + 'message' + '/' + messageId + '/' + newMessageStatus, {withCredentials: true}
      )
    ).data;
  }

  //#endregion message

  //#region dashboard

  async getCharts(idProject: number) {
    return (await axios.patch(this.URL + idProject + '/dashboard/getCharts', {withCredentials: true}))
      .data;
  }

  async postDashboard(dashboard: Dashboard, idProject: number) {
    return (await axios.post(this.URL + idProject + '/dashboard', dashboard, {withCredentials: true}))
      .data;
  }

<<<<<<< HEAD
  async getDashboards(idProject: number) {
    return (await axios.get(this.URL + idProject + '/dashboard', {withCredentials: true})).data;
=======
  async updateTaskScheludeDate(taskId:number, userId:number, newDate:Date)  {
    return (await axios.patch(this.URL+"task/update/"+taskId+"/scheludeDate/"+userId+"/calendar/"+newDate)).data
  }

  async deleteTask(taskId:number) {
    return (await axios.delete(this.URL+"task/delete/"+taskId)).data
>>>>>>> dev
  }

  async deleteDashboard(idDashboard: number) {
    return (await axios.delete(this.URL + 0 + '/dashboard/' + idDashboard, {withCredentials: true}))
      .data;
  }

  async updateDashboard(
    dashboard: Dashboard,
    idDashboard: number,
    idProject: number
  ) {
    return (
      await axios.put(
        this.URL + idProject + '/dashboard/' + idDashboard,
        dashboard, {withCredentials: true}
      )
    ).data;
  }

  async setChartToDash(
    idDashboard: number,
    idProject: number,
    chart: DashBoardCharts
  ) {
    return (
      await axios.patch(
        this.URL + idProject + '/dashboard/' + idDashboard,
        chart, {withCredentials: true}
      )
    ).data;
  }

<<<<<<< HEAD
  async updateChartList(
    idDashboard: number,
    idProject: number,
    charts: Array<DashBoardCharts>
  ) {
    return (
      await axios.patch(
        this.URL + idProject + '/dashboard/' + idDashboard + '/updateChartList',
        charts, {withCredentials: true}
      )
    ).data;
=======
  async postDashboard(dashboard:Dashboard, idProject:number, actionUserId:number){
    return (await axios.post(this.URL+idProject+"/dashboard/"+actionUserId, dashboard)).data 
>>>>>>> dev
  }

  async deleteChart(idDashboard: number, idChart: number, idProject: number) {
    return (
      await axios.delete(
        this.URL +
        idProject +
        '/dashboard/' +
        idDashboard +
        '/delete-chart/' +
        idChart, {withCredentials: true}
      )
    ).data;
  }

<<<<<<< HEAD
  //#endregion dashboard

}
=======
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
  async patchTeamName(teamId:number, name:string):Promise<Team>{
    let path:string = "team/"
    let formData:FormData = new FormData
    formData.append("name",name)
    return (await axios.patch(this.URL+path+teamId+"/name", formData)).data
  }
  async patchTeamParticipants(teamId:number, users:Array<User>):Promise<Team>{
    let path:string = "team/"
    return (await axios.patch(this.URL+path+teamId+"/participants", users)).data
  }
  async patchTeamImageColor(teamId:number, name:string):Promise<Team>{
    let path:string = "team/"
    let formData:FormData = new FormData
    formData.append("imageColor",name)
    return (await axios.patch(this.URL+path+teamId+"/imageColor", formData)).data
  }
  async patchTeamImage(teamId:number, name:File):Promise<Team>{
    let path:string = "team/"
    let formData:FormData = new FormData
    formData.append("image",name)
    return (await axios.patch(this.URL+path+teamId+"/image", formData)).data
  }

  async getUserWorkedTime(userId:number, taskId:number){
    return (await (axios.get(this.URL+"task/get/"+userId+"/"+taskId))).data;
  }

  async updateUserWorkedTime(userTaskUpdate : UsuarioTarefa){
    return (await (axios.put(this.URL+"task/put/workedTime", userTaskUpdate))).data;
  }

  async addUserToProject(idProject:number, userId:number, actionUserId:number){
    return (await axios.patch(this.URL+"project/"+idProject+"/addUser/"+userId+"/"+actionUserId)).data
  }

}
>>>>>>> dev
