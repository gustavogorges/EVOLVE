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
import { config } from 'rxjs';
import { UserProject } from 'src/model/userProject';
<<<<<<< HEAD
import { File } from 'src/model/file';
import { Role } from 'src/model/Role';
=======
import { Role } from 'src/model/Role';
>>>>>>> 76397d15948b8c549f1e5eb1baee8a5c678b06c8

@Injectable({
  providedIn: 'root',
})
export class BackendEVOLVEService {
  URL: string = 'http://localhost:8087/';
  project$: any;

  constructor() { }

  //#region Generics

  async getAllSomething(caminho: string) {
    return (await axios.get(this.URL + caminho)).data;
  }

  async getOne(caminho: string, id: number) {
    return (
      await axios.get(this.URL + caminho + '/' + 3, { withCredentials: true })
    ).data;
  }

  async deleteById(caminho: string, id: number) {
    return (await axios.delete(this.URL + caminho + '/' + id)).data;
  }

  //#endregion Generics

  //#region User

  async getUser(email: string) {
    return (await axios.get(this.URL + 'user/login' + '/' + email)).data;
  }

  async postUsuario(usuario: User) {
    return (await axios.post(this.URL + 'user', usuario)).data;
  }

  // async putUsuario(usuario: User | Pick<User, 'id'>) {
  //   return (await axios.put(this.URL + 'user', usuario)).data;
  // } //deprecated (use patches instead)

  async patchUserEmail(userId: number, email: string): Promise<User> {
    return (
      await axios.patch(`${this.URL}user/${userId}/email/${email}`)
    ).data;
  }
  async patchUserName(userId: number, name: string): Promise<User> {
    return (
      await axios.patch(`${this.URL}user/${userId}/name/${name}`)
    ).data;
  }
  async patchUserTheme(userId: number, theme: string): Promise<User> {
    return (
      await axios.patch(this.URL + 'user/' + userId + '/theme' + '/' + theme, {
        withCredentials: true,
      })
    ).data;
  }

  async patchUserPassword(userId: number, password: string): Promise<User> {
    let formsData = new FormData();
    formsData.append('password', password);
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/password', formsData
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
        formsData
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
        formsData
      )
    ).data;
  }

  async patchUserPrimaryDarkColor(
    userId: number,
    primaryDarkColor: string
  ): Promise<User> {
    let formsData = new FormData();
    formsData.append('primaryColor', primaryDarkColor);
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/primaryDarkColor',
        formsData
      )
    ).data;
  }
  async patchUserSecondaryDarkColor(
    userId: number,
    secondaryDarkColor: string
  ): Promise<User> {
    let formsData = new FormData();
    formsData.append('secondaryColor', secondaryDarkColor);
    return (
      await axios.patch(
        this.URL + 'user' + userId + '/secondaryDarkColor',
        formsData
      )
    ).data;
  }
  async patchUserFontSize(userId: number, fontSize: number): Promise<User> {
    return (
      await axios.patch(
        this.URL + 'user/' + userId + '/fontSize' + '/' + fontSize
      )
    ).data;
  }
  async patchImageUser(id: number, image: any) {
    return (await axios.patch(this.URL + 'user/' + id, image)).data;
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
        associates
      )
    ).data;
  }

  async getAllCommentsOfTask(taskId: number) {
    return (await axios.get(this.URL + 'task/' + taskId + '/comments/getAll')).data;
  }

  async patchNewComment(taskId: number, newComment: Comment, userId: number) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + 'comments/patch/user/' + userId,
        newComment
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
        userId
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
        taskProjectProperty
      )
    ).data;
  }

  async updateCurrentStatus(taskId: number, userId: number, newStatus: Status) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/update' + '/currentStatus/user/' + userId,
        newStatus
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
        newPriority
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
        newOption
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
        optionId
      )
    ).data;
  }

  async patchSubtask(subtask: Subtask, taskId: number, userId: number) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/subtask/' + userId,
        subtask
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
        userId
      )
    ).data;
  }

  async patchPriority(priority: number, taskId: number) {
    console.log(priority);

    return (
      await axios.patch(
        this.URL + 'task/priority/patch/' + taskId + '/' + priority
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
        propertyValue
      )
    ).data;
  }

  async getAllPriorities(projectId: number) {
    return (await axios.get(this.URL + 'task/' + projectId + '/priorities')).data;
  }

  async postTarefa(tarefa: Task) {
    return (await axios.post(this.URL + 'task', tarefa)).data;
  }

  async putTarefa(tarefa: Task, userId: number) {
    return (await axios.put(this.URL + 'task/user/' + userId, tarefa)).data;
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
        propertyId
      )
    ).data;
  }

  async updateTaskName(taskId: number, userId: number, newName: string) {
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/update/user' + userId + + '/name/' + newName
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
        newOptions
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
          newDate

      )
    ).data;
  }

  async deleteTask(taskId: number) {
    return (await axios.delete(this.URL + 'task/' + taskId + '/delete')).data;
  }

  async patchTaskFile(taskId: number, userId: number, file: any) {
    let formData = new FormData();
    formData.append('file', file);
    return (
      await axios.patch(
        this.URL + 'task/' + taskId + '/patch/task/file/' + userId,
        formData
      )
    ).data;
  }

  async deleteTaskFile(taskId: number, fileId: number, userId: number) {
    return (
      await axios.delete(this.URL + "task/"+taskId+"/delete/file/"+fileId+"/"+userId)
    ).data;
  }

  //#endregion Task

  //#region Project

  async getProjectsByUserId(userId: number) {
    return (await axios.get(this.URL + 'project' + '/user/' + userId, { withCredentials: true })).data;
  }
  async getProjectsByTeamId(teamId: number) {
    return (
      await axios.get(this.URL + 'project' + '/team/' + teamId, { withCredentials: true })
    ).data;
  }

  async getAllCommentsOfProject(projectId: number) {
    return (await axios.get(this.URL + 'project/comments/getAll/' + projectId))
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
        newComment
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
        userId
      )
    ).data;
  } //not found in projectController on API

  async postProjeto(project: Project, teamId: number) {
    return (await axios.post(this.URL + 'project/team/' + teamId, project)).data;
  }

  async putProjeto(project: Project) {
    //falta fazer aqui
    await axios.patch(this.URL + 'project/', project.id + "/")
    // return (await axios.put(this.URL + 'project', project)).data;
  }

  async updateStatusList(projetoId: number, statusList: Array<Status>) {
    return (await axios.patch(this.URL + 'project/' + projetoId + "/statusList", statusList))
      .data;
  }

  async deleteStatus(projetoId: number, statusId: number) {
    return (
      await axios.patch(
        this.URL + 'project/' + projetoId + '/statusList/remove/' + statusId)
    ).data;
  }

  async patchProjectName(projectId: number, newName: string) {
    let formData: FormData = new FormData;
    formData.append("name", newName);
    return (
      await axios.patch(this.URL + "project/" + projectId + "/name", newName)
    )
  }

  async patchProjectDescription(projectId: number, description: string) {
    let formData: FormData = new FormData;
    formData.append("description", description);
    return (
      await axios.patch(this.URL + "project/" + projectId + "description", description)
    ).data;
  }

  async patchProjectImage(id: number, image: any) {
    let formData = new FormData
    formData.append("image", image)
    return (await axios.patch(this.URL + 'project/' + id + '/image', formData))
      .data;
  }

  async patchProjectImageRemove(projectId: number) {
    return (
      await axios.patch(this.URL + "project/" + projectId + "/image/remove")
    ).data;
  }

  async patchProjecyImageColor(projecId: number, imageColor: string) {
    let formData: FormData = new FormData;
    formData.append("imageColor", imageColor);
    return (
      await axios.patch(this.URL + "project/" + projecId + "imageColor", imageColor)
    ).data
  }

  async patchProjectFinalDate(projecId: number, finalDate: string) {
    let formData: FormData = new FormData;
    formData.append("finalDate", finalDate);
    return (
      await axios.patch(this.URL + "project/" + projecId + "/finalDate", finalDate)
    ).data;
  }

  async patchProjectStatusList(projecId: number, statusList: Status[]) {
    return (
      await axios.patch(this.URL + "project/" + projecId + "/statusList", statusList)
    ).data;
  }

  async patchProjectStatusListRemove(projecId: number, statusId: number) {
    return (
      await axios.patch(this.URL + "project/" + projecId + "/statusList/remove" + statusId)
    ).data;
  }

  async patchProjectMembers(projectId: number, members: UserProject[]) {
    return (await axios.patch(this.URL + 'project/' + projectId + "/members", members, { withCredentials: true })
    ).data;
  }

  async patchProjectTasks(projectId: number, tasks: Task[]) {
    return (
      await axios.patch(this.URL + "project/" + projectId + "/tasks", tasks)
    ).data
  }

  async patchProjectTasksRemove(projectId: number, taskId: number) {
    return (
      await axios.patch(this.URL + "project/" + projectId + "/task/remove/" + taskId)
    ).data;
  }

  async patchDefaultRole(projecId: number, defaultRole: Role) {
    return (
      await axios.patch(this.URL + "project/" + projecId + "defaultRole", defaultRole)
    )
  }
  //#endregion project

  //#region Team

  async getTeamsByUserId(userId: number) {
    return (await axios.get(this.URL + 'team/user/' + userId, { withCredentials: true })).data;
  }

  async postEquipe(equipe: Team) {
    return (await axios.post(this.URL + 'team', equipe)).data;
  }

  async putEquipe(equipe: Team) {
    return (await axios.put(this.URL + 'team', equipe)).data;
  }

  async patchReadedNotification(teamId: number, notificationId: number) {
    return (
      await axios.patch(this.URL + 'team/' + teamId + '/' + notificationId)
    ).data;
  }

  async patchName(teamId: number, newName: String) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/" + newName)
    ).data;
  }

  async patchTeamImage(teamId: number, image: any) {
    let formData: FormData = new FormData;
    formData.append("image", image);
    return (
      await axios.patch(this.URL + "team/" + teamId + "/" + "image", formData)
    ).data;
  }

  async patchTeamImageRemove(teamId: number) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/image/remove")
    ).data;
  }

  async patchTeamImageColor(teamId: number, newImageColor: string) {
    let formData: FormData = new FormData;
    formData.append("imageColor", newImageColor);
    return (
      await axios.patch(this.URL + "team/" + teamId + "/imagecolor", formData)
    ).data;
  }

  async patchTeamParticipants(teamId: number, participants: User[]) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/participants", participants)
    ).data;
  }

  async patchTeamRoles(teamId: number, roles: Role[]) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/roles", roles)
    ).data;
  }

  async patchTeamDefaultRole(teamId: number, defaultRole: Role) {
    return (
      await axios.patch(this.URL + "team/" + teamId + "/defaultRole", defaultRole)
    ).data;
  }

  async cleanAllUserNotifications(userId: number) {
    return (await axios.delete(this.URL + 'team/clean/' + userId)).data;
  }

  //#endregion Team

  //#region userChat

  async postUserChat(chat: UserChat) {
    (await axios.post(this.URL + 'userChat', chat)).data;
  }

  async putUserChat(chat: UserChat) {
    return (await axios.put(this.URL + 'userChat', chat)).data;
  }


  //retirar quando tiver websocket ou quando aprender a pegar atributos que possuem jsonIgnore sem dar stackOverflow
  async getUserChatsByUserId(id: number): Promise<Array<UserChat>> {
    return (await axios.get(this.URL + "userChat/user/" + id)).data;
  }

  //#endregion userChat

  //#region teamChat

  async getTeamChatsByUserId(id: number): Promise<Array<TeamChat>> {
    return (await axios.get(this.URL + "teamChat/user/" + id)).data;
  }

  //#endregion teamChat

  //#region projectChat

  async getProjectChatsByUserId(id: number): Promise<Array<ProjectChat>> {
    return (await axios.get(this.URL + "projectChat/user/" + id)).data;
  }

  //#endregion projectChat

  //#region message

  async postMessage(message: MessageDTO): Promise<Message> {
    return (await axios.post(this.URL + 'message', message)).data;
  }

  async putMessage(message: MessageDTO): Promise<Message> {
    console.log('fazendo update na service');

    console.log(message);

    return (await axios.put(this.URL + 'message', message)).data;
  }

  async patchMessageStatus(
    messageId: number,
    newMessageStatus: string
  ): Promise<Message> {
    return (
      await axios.patch(
        this.URL + 'message' + '/' + messageId + '/' + newMessageStatus
      )
    ).data;
  }

  //#endregion message

  //#region dashboard

  async getCharts(idProject: number) {
    return (await axios.patch(this.URL + idProject + '/dashboard/getCharts'))
      .data;
  }

  async postDashboard(dashboard: Dashboard, idProject: number) {
    return (await axios.post(this.URL + idProject + '/dashboard', dashboard))
      .data;
  }

  async getDashboards(idProject: number) {
    return (await axios.get(this.URL + idProject + '/dashboard')).data;
  }

  async deleteDashboard(idDashboard: number) {
    return (await axios.delete(this.URL + 0 + '/dashboard/' + idDashboard))
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
        dashboard
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
        chart
      )
    ).data;
  }

  async updateChartList(
    idDashboard: number,
    idProject: number,
    charts: Array<DashBoardCharts>
  ) {
    return (
      await axios.patch(
        this.URL + idProject + '/dashboard/' + idDashboard + '/updateChartList',
        charts
      )
    ).data;
  }

  async deleteChart(idDashboard: number, idChart: number, idProject: number) {
    return (
      await axios.delete(
        this.URL +
        idProject +
        '/dashboard/' +
        idDashboard +
        '/delete-chart/' +
        idChart
      )
    ).data;
  }

  //#endregion dashboard

}
