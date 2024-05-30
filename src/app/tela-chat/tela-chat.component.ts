import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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

export class TelaChatComponent implements OnInit, AfterViewChecked {

  chatTypeUsers:string = "users"
  chatTypeTeams:string = "teams"
  chatTypeProjects:string = "projects"
  chatOpen : boolean = false
  loggedUser: User = new User
  search:string = ""
  selectedChat!:Chat
  chatType:string = "users";
  chatList:Array<Chat> = new Array  

  @ViewChild('messagesContainer') chatMessages!: ElementRef;

  constructor(
    private service: BackendEVOLVEService,
    private cookiesService: CookiesService
  ) { }

  contact: User|Team|Project = new User

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookiesService.getLoggedUser()
    this.setChatListType(await this.cookiesService.get(this.cookiesService.chatListTypeField))
    this.selectChat(await this.getLastChat(this.chatType))
    this.sortChatList()
    this.resizeWindow()
  }

  // Esta função será chamada sempre que houver mudanças na view
  ngAfterViewChecked() {
    this.chatScrollToBottom();
  }

  // Função para rolar para o final do chat
  chatScrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch(err) { }
  }  

  async getLastChat(chatType:string):Promise<Chat>{
    switch(chatType){
      case this.chatTypeTeams : return (await this.service.getTeamChatsByUserId(this.loggedUser.id))
      .find(chat => chat.id == this.cookiesService.get("lastChatId"))!
      case this.chatTypeProjects : return (await this.service.getProjectChatsByUserId(this.loggedUser.id))
      .find(chat => chat.id == this.cookiesService.get("lastChatId"))!
      default : return (await this.service.getUserChatsByUserId(this.loggedUser.id))
      .find(chat => chat.id == this.cookiesService.get("lastChatId"))!
    }
  }

  async setChatListType(type:string):Promise<void>{
    this.chatType = type
    this.chatList = await this.getChatType(type)
    
  }

  async getChatType(type:string){
    switch (type){
      case this.chatTypeProjects : return await this.service.getProjectChatsByUserId(this.loggedUser.id)
      case this.chatTypeTeams : return await this.service.getTeamChatsByUserId(this.loggedUser.id)
      default : return await this.service.getUserChatsByUserId(this.loggedUser.id)
    }
  }

  getContactName(chat:Chat){
    switch(this.chatType){
      case this.chatTypeTeams : return (chat as TeamChat).team?.name?.toLowerCase();
      case this.chatTypeProjects : return (chat as ProjectChat).project?.name?.toLowerCase();
      default : return this.getContact(chat, this.loggedUser).name.toLowerCase();
    }
  }

  checkSearch(chat:Chat):Boolean{
    let contactName = this.getContactName(chat);
    return contactName?.includes(this.search.toLowerCase())
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
    this.chatOpen = true
  }

  getContact(chat:Chat, user: User):User|Team|Project {
    switch(this.chatType){
      case this.chatTypeTeams : return (chat as TeamChat).team
      case this.chatTypeProjects : return (chat as ProjectChat).project
      default : return this.getContactFromUserChat(chat, user)
    }
  }

  closeChat(){
    this.chatOpen = false
  }

  @HostListener('window:resize', ['$event'])
    resizeWindow(){
        if(window.innerWidth > 1024){
            this.chatOpen = false
            return false
        }
        this.chatOpen = true
        return true
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

  sortChatList(){
    this.chatList.sort(this.orderChatByMostRecentMessage);
  }

  orderChatByMostRecentMessage(a:Chat, b:Chat){
    if(!(a.messages.length>0) && !(b.messages.length>0)){
      return 0
    } else if (!(a.messages.length>0)){
      return 1
    } else if(!(b.messages.length>0)){
      return -1
    }
    let verificacao = new Date(this.getlastMessage(b).date).getTime() - new Date(this.getlastMessage(b).date).getTime();
  
    return verificacao  
  }

  getlastMessage(chat:Chat){
    return chat.messages.find(message => chat.messages.indexOf(message) == chat.messages.length -1)!
  }

}
