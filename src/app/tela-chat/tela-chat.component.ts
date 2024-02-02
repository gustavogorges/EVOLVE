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

  // messageAlignment:String = "end"
  // senderImagePointerAlignment:String = "right"
  // senderImagePointerDirection:Number = 46
  // showSenderImagePointer:Boolean = false

  loggedUser: User = new User
  search:string = ""
  // newMessage: MessageDTO = new MessageDTO

  chatList:Array<Chat> = new Array

  chatTypeUsers:string = "users"
  chatTypeTeams:string = "teams"
  chatTypeProjects:string = "projects"
  chatType:string = ""

  selectedChat:Chat = new UserChat

  constructor(
    private service: BackendEVOLVEService,
    private cookiesService: CookiesService
  ) { }

  contact: User = new User

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookiesService.getLoggedUser()
    // this.loggedUser = await this.service.getOne("user", 1202)
    this.loggedUser.chats = await this.service.getChatsByUserId(this.loggedUser.id)
    console.log(this.loggedUser)

    // this.contact = chat.getContactFromUser(user)
    // console.log(this.getContactFromUser(this.loggedUser.chats[1], this.loggedUser))

    this.selectedChat = await this.getLastChat()
    this.contact = this.getContactFromUser(this.selectedChat, this.loggedUser)
  }

  async getLastChat():Promise<Chat>{
    return await this.service.getChatsByUserId(this.loggedUser.id).then( (chats:Array<Chat>) => {

      for(let chat of chats){
        if(chat.id == JSON.parse(localStorage.getItem("lastChatId") ?? "")){
          return chat
        }
      }

      return new UserChat
    })
  }

  setChatListType(type:string):void{
    if(type == this.chatTypeUsers){
      this.chatList = this.loggedUser.chats
    }
    if(type == this.chatTypeProjects){
      console.log("aaaaaaaaaaaaa")
      this.chatList = this.filterTeamChats(this.loggedUser)
    }
    if(type == this.chatTypeTeams){

    }
  }

  filterTeamChats(loggedUser:User):Array<Chat>{
    let teamChats = new Array<TeamChat>
    for(let team of loggedUser.teams){
      teamChats.push(team.chat)
    }
    return teamChats
  }

  checkSearch(chat:Chat):Boolean{
    let contactName = this.getContactFromUser(chat, this.loggedUser).name.toLowerCase()
    return contactName.includes(this.search.toLowerCase())
  }


  selectChat(chat:Chat):void{
    this.contact = this.getContactFromUser(chat, this.loggedUser)
    console.log(chat)
    this.selectedChat = chat
    localStorage.setItem("lastChatId",JSON.stringify(this.selectedChat.id))
  }

  getContactFromUser(chat: UserChat, user: User) {
    let users:Array<User> = chat.users
    if (users[0].id != user.id) {
      return users[0]
    }
    return users[1]
  }

}
