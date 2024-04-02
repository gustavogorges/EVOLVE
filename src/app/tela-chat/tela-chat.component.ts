import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/model/chat';
import { TeamChat } from 'src/model/teamChat';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';
import { ProjectChat } from 'src/model/projectChat';
import { Message } from 'src/model/message';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})

export class TelaChatComponent implements OnInit {

  chatTypeUsers:string = "users"
  chatTypeTeams:string = "teams"
  chatTypeProjects:string = "projects"

  loggedUser: User = new User
  search:string = ""
  selectedChat!:Chat
  chatType:string = "users";
  chatList:Array<Chat> = new Array  

  constructor(
    private service: BackendEVOLVEService,
    private cookiesService: CookiesService
  ) { }

  contact: User|Team|Project = new User

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookiesService.getLoggedUser()
    this.setChatListType(await this.cookiesService.get(this.cookiesService.chatListTypeField))
    this.selectChat(await this.getLastChat())
    this.contact = this.getContact(this.selectedChat, this.loggedUser)
  }

  async getLastChat():Promise<Chat>{
    return (await this.service.getUserChatsByUserId(this.loggedUser.id))
    .find(chat => chat.id == this.cookiesService.get("lastChatId"))!
  }

  async setChatListType(type:string):Promise<void>{
    this.chatType = type
    this.chatList = await this.getChatType(type)
    // this.cookiesService.set(this.cookiesService.chatListTypeField, type)
  }

  async getChatType(type:string){
    switch (type){
      case this.chatTypeProjects : 
      return await this.service.getProjectChatsByUserId(this.loggedUser.id)
      case this.chatTypeTeams : return await this.service.getTeamChatsByUserId(this.loggedUser.id)
      default : return await this.service.getUserChatsByUserId(this.loggedUser.id)
    }
  }

  getContactName(chat:Chat){
    switch(this.chatType){
      case this.chatTypeTeams : return (chat as TeamChat).team.name.toLowerCase();
      case this.chatTypeProjects : return (chat as ProjectChat).project.name.toLowerCase();
      default : return this.getContact(chat, this.loggedUser).name.toLowerCase();
    }
  }

  checkSearch(chat:Chat):Boolean{
    let contactName = this.getContactName(chat);
    return contactName.includes(this.search.toLowerCase())
  }

  //rever para que atualize nos chats de projetos e equipes quando todos verem (caiu em desuso)
  // updateMessageStatus(){
  //   this.selectedChat.messages.forEach(async message => {
  //     if(message.messageStatus!=3){
  //       if(this.chatTypeUsers && message.sender!=this.loggedUser){
  //         message = await this.service.patchMessageStatus(message.id, "VISUALIZED")
  //       }
  //     }
  //   })
  // }

  selectChat(chat:Chat):void{
    this.contact = this.getContact(chat, this.loggedUser)
    this.selectedChat = chat
    // this.updateMessageStatus()
    this.cookiesService.set("lastChatId", this.selectedChat.id)
    this.cookiesService.set(this.cookiesService.chatListTypeField, this.chatType)
  }

  getContact(chat:Chat, user: User):User|Team|Project {
    switch(this.chatType){
      case this.chatTypeTeams : return (chat as TeamChat).team
      case this.chatTypeProjects : return (chat as ProjectChat).project
      default : return this.getContactFromUserChat(chat, user)
    }
  }

  getContactFromUserChat(chat: UserChat, user: User){
    if (chat.users[0]?.id != user.id) {
      return chat.users[0]
    }
    return chat.users[1]
  }

  showDateMesssage(message:Message){
    return this.isFirstMessage(message, this.selectedChat.messages) ||
     new Date(this.getPreviousMessage(message).date).getDay()!=new Date(message.date).getDay();
  }

  getPreviousMessage(message:Message){
    let messageIndex: number = this.selectedChat.messages.indexOf(message)
    let previousMessage: Message = this.selectedChat.messages.at(messageIndex - 1)!
    return previousMessage;
  }

  isFirstMessage(message:Message, messageList:Array<Message>){
    return messageList[0] == message
  }

  // sortChatList(){
  //   this.chatList.sort()
  // }

}
