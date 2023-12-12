import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { Chat } from 'src/model/chat';
import { Message } from 'src/model/message';
import { UserChat } from 'src/model/userChat';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
// import { FileService } from 'src/service/file.service';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})
export class TelaChatComponent implements OnInit {



  loggedUser: Usuario = new Usuario
  fotoPerfilUrl: string = ""

  newMessage: MessageDTO = new MessageDTO

  constructor(
    private service: BackendEVOLVEService,
    // private fileService:FileService
  ) { }

  contact: Usuario = new Usuario
estilo:string = ""
  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.service.getOne("usuario", 303)
    this.loggedUser.chats = await this.service.getChatsByUserId(this.loggedUser.id)

    console.log(this.loggedUser)

    this.fotoPerfilUrl = this.loggedUser.fotoPerfil

    // this.contact = chat.getContactFromUser(user)
    console.log(this.getContactFromUser(this.loggedUser.chats[0], this.loggedUser))

    this.newMessage
    this.estilo = "end"

  }

  // Omit<UserChat, "message">
  // async sendMessage(chat:UserChat): Promise<void> {
    async sendMessage(): Promise<void> {

    let messageDate: Date = new Date()

    let sender = new Usuario()
    sender.id = this.loggedUser.id

    this.newMessage.sender = sender

    this.newMessage.chatId = this.loggedUser.chats[0].id

    //mudar status ao receber mensagem (backend?)
    this.newMessage.messageStatus = 0

    this.newMessage.date = messageDate.toISOString()

    console.log(await this.service.postMessage(this.newMessage))

    this.newMessage = new MessageDTO

  }

  previousMessageIsFromLoggedUser(message:Message):Boolean{
    let messages:Array<Message> =  this.loggedUser.chats[0].messages
    let previousMessageIndex:number = messages.indexOf(message) - 1 
    if(previousMessageIndex >= 0){
      // console.log(messages[previousMessageIndex].sender)
      // console.log(this.loggedUser)
      return messages[previousMessageIndex].sender.id == this.loggedUser.id
    }
    return false

  }

  getContactFromUser(chat: UserChat, user: Usuario) {
    if (chat.users[0] != user) {
      return chat.users[0]
    }
    return chat.users[1]
  }

// a(index:number, message:Message):Boolean{
//   console.log(index == 0 || !this.previousMessageIsFromLoggedUser(message) && message.sender == this.loggedUser)
//   console.log(!this.previousMessageIsFromLoggedUser(message) && message.sender == this.loggedUser)
//   console.log(message.sender == this.loggedUser)
//   console.log(!this.previousMessageIsFromLoggedUser(message))
//   console.log(message.sender)
//   return index == 0 || !this.previousMessageIsFromLoggedUser(message) && message.sender == this.loggedUser
// }

}
