import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { Chat } from 'src/model/chat';
import { Message } from 'src/model/message';
import { UserChat } from 'src/model/userChat';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})
export class TelaChatComponent implements OnInit {

  messageAlignment:String = "end"
  senderImagePointerAlignment:String = "right"
  senderImagePointerDirection:Number = 46
  showSenderImagePointer:Boolean = false

  loggedUser: Usuario = new Usuario

  newMessage: MessageDTO = new MessageDTO

  selectedChat:Chat = new UserChat

  constructor(
    private service: BackendEVOLVEService,
  ) { }

  contact: Usuario = new Usuario

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.service.getOne("usuario", 1202)
    this.loggedUser.chats = await this.service.getChatsByUserId(this.loggedUser.id)

    console.log(this.loggedUser)

    // this.contact = chat.getContactFromUser(user)
    // console.log(this.getContactFromUser(this.loggedUser.chats[1], this.loggedUser))

    this.selectedChat = await this.getLastChat()
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

  selectChat(chat:Chat):void{
    console.log(chat)
    this.selectedChat = chat
    localStorage.setItem("lastChatId",JSON.stringify(this.selectedChat.id))
  }

  // Omit<UserChat, "message">
  // async sendMessage(chat:UserChat): Promise<void> {
    async sendMessage(): Promise<void> {

    let messageDate: Date = new Date()

    let sender = new Usuario()
    sender.id = this.loggedUser.id

    this.newMessage.sender = sender

    this.newMessage.chatId = this.selectedChat.id

    //mudar status ao receber mensagem (backend?)
    this.newMessage.messageStatus = 0

    this.newMessage.date = messageDate.toISOString()

    console.log(await this.service.postMessage(this.newMessage))

    this.newMessage = new MessageDTO

  }



  getContactFromUser(chat: UserChat, user: Usuario) {
    let users:Array<Usuario> = chat.users
    if (users[0].id != user.id) {
      return users[0]
    }
    return users[1]
  }





  previousMessageIsFromLoggedUser(currentMessageIndex:Number):Boolean{
    let messages:Array<Message> =  this.selectedChat.messages
    let previousMessageIndex:number = currentMessageIndex.valueOf() - 1 
    if(previousMessageIndex >= 0){
      return messages[previousMessageIndex].sender.id == this.loggedUser.id
    }
    return false

  }

  showImage(messageIndex:Number,message:Message):Boolean{

    this.setMessageAlignment(message)

    if(!this.previousMessageIsFromLoggedUser(messageIndex) && message.sender.id == this.loggedUser.id){
      this.showSenderImagePointer = true
      return true
    } else if( this.previousMessageIsFromLoggedUser(messageIndex) && message.sender.id != this.loggedUser.id){
      this.showSenderImagePointer = true
      return true
    }

    this.showSenderImagePointer = messageIndex == 0
    return messageIndex == 0
  }

  setMessageAlignment(message:Message):void{

    if(message.sender.id == this.loggedUser.id){
      this.messageAlignment = "end"
      this.senderImagePointerAlignment = "right"
      this.senderImagePointerDirection = 46
    } else {
      this.messageAlignment = "start"
      this.senderImagePointerAlignment = "left"
      this.senderImagePointerDirection = -46
    }

  }

}
