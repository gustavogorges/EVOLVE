import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/model/chat';
import { TeamChat } from 'src/model/teamChat';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';

interface ChatHeaderInfo{
  name:String,
  image:string
}

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})

export class TelaChatComponent implements OnInit {

  chatListTypeCookieField = "chatListType"
  loggedUser: User = new User
  search:string = ""

  chatList:Array<UserChat>|Array<TeamChat> = new Array

  // userChatList:Array<UserChat> = new Array
  // teamChatList:Array<TeamChat> = new Array

  chatTypeUsers:string = "users"
  chatTypeTeams:string = "teams"
  chatTypeProjects:string = "projects"
  chatType:string = "users";

  selectedChat!:Chat

  constructor(
    private service: BackendEVOLVEService,
    private cookiesService: CookiesService
  ) { }

  contact: User|Team|Project = new User

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookiesService.getLoggedUser()
    this.setChatListType(await this.cookiesService.get(this.chatListTypeCookieField))
    this.selectChat(await this.getLastChat())
    this.contact = this.getContactFromUser(this.selectedChat, this.loggedUser)
  }

  async getLastChat():Promise<Chat>{
    return await this.service.getUserChatsByUserId(this.loggedUser.id)
      .then((chats:Array<Chat>) => 
        chats.find((chat) => chat.id == this.cookiesService.get("lastChatId"))!
      )
  }

  async setChatListType(type:string):Promise<void>{
    this.chatType = type
    if(type == this.chatTypeUsers){
      this.chatList = await this.service.getUserChatsByUserId(this.loggedUser.id)
      // this.userChatList = await this.service.getUserChatsByUserId(this.loggedUser.id)
      // this.teamChatList = new Array
    }
    if(type == this.chatTypeProjects){
    }
    if(type == this.chatTypeTeams){
      console.log("AAAAAAAAA");
      console.log( await this.service.getTeamChatsByUserId(this.loggedUser.id));
      
      this.chatList = await this.service.getTeamChatsByUserId(this.loggedUser.id)
      // this.teamChatList = await this.service.getTeamChatsByUserId(this.loggedUser.id)
      // this.userChatList = new Array
    }
    this.cookiesService.set(this.chatListTypeCookieField, type)
  }


  checkSearch(chat:UserChat|TeamChat):Boolean{
    let contactName 
    
    if(this.chatType==this.chatTypeTeams){
      
      contactName = (chat as TeamChat).team.name.toLowerCase()
      return contactName.includes(this.search.toLowerCase())
    }
    if(this.chatType == this.chatTypeUsers){
      
      contactName = this.getContactFromUser(chat, this.loggedUser).name.toLowerCase()
      return contactName.includes(this.search.toLowerCase())
    }
    // console.log("nao entrei");
    
    return false
  }


  selectChat(chat:Chat):void{
    this.contact = this.getContactFromUser(chat, this.loggedUser)
    this.selectedChat = chat
    
    this.selectedChat.messages.forEach(async message => {
      if(message.messageStatus!=3){
        if(message.sender!=this.loggedUser){
          message = await this.service.patchMessageStatus(message.id, "VISUALIZED")
        }
      }
    })
    this.cookiesService.set("lastChatId", this.selectedChat.id)
  }

  getContactFromUser(chat: UserChat|TeamChat, user: User):User|Team {
    // let users:Array<User> = chat.users

    if(this.chatType == this.chatTypeTeams){
      return (chat as TeamChat).team
    }

    if (chat.users[0]?.id != user.id) {
      return chat.users[0]
    }
    return chat.users[1]
  }


}
