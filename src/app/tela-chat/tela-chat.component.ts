import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/model/chat';
import { TeamChat } from 'src/model/teamChat';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

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

  chatList:Array<Chat> = new Array

  chatTypeUsers:string = "users"
  chatTypeTeams:string = "teams"
  chatTypeProjects:string = "projects"
  chatType:string = ""

  selectedChat!:Chat

  constructor(
    private service: BackendEVOLVEService,
    private cookiesService: CookiesService
  ) { }

  contact: User = new User

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookiesService.getLoggedUser()
    // this.loggedUser.chats = await this.service.getChatsByUserId(this.loggedUser.id)
    console.log(this.loggedUser)

    // this.contact = chat.getContactFromUser(user)
    // console.log(this.getContactFromUser(this.loggedUser.chats[1], this.loggedUser))

    this.selectedChat = await this.getLastChat()
    console.log("this.selectedChat");
    console.log(this.selectedChat);
    
    
    this.contact = this.getContactFromUser(this.selectedChat, this.loggedUser)
  }

  async getLastChat():Promise<Chat>{
    return await this.service.getUserChatsByUserId(this.loggedUser.id)
      .then((chats:Array<Chat>) => 
        chats.find((chat) => chat.id == this.cookiesService.get("lastChatId"))!
      )
  }

  async setChatListType(type:string):Promise<void>{
    if(type == this.chatTypeUsers){
      console.log(this.loggedUser);
      this.chatList = await this.service.getUserChatsByUserId(this.loggedUser.id)
    }
    if(type == this.chatTypeProjects){
    }
    if(type == this.chatTypeTeams){
      this.chatList = await this.service.getTeamChatsByUserId(this.loggedUser.id)
    }
    this.cookiesService.set(this.chatListTypeCookieField, type)
  }


  checkSearch(chat:Chat):Boolean{
    console.log(chat);
    console.log(this.getContactFromUser(chat, this.loggedUser));
    
    let contactName = this.getContactFromUser(chat, this.loggedUser).name.toLowerCase()
    console.log(contactName);
    
    return contactName.includes(this.search.toLowerCase())
  }


  selectChat(chat:Chat):void{
    this.contact = this.getContactFromUser(chat, this.loggedUser)
    console.log(chat)
    this.selectedChat = chat
    this.cookiesService.set("lastChatId", this.selectedChat.id)
  }

  getContactFromUser(chat: UserChat, user: User) {
    // let users:Array<User> = chat.users
    if (chat.users[0]?.id != user.id) {
      return chat.users[0]
    }
    return chat.users[1]
  }

}
