import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  newMessage: Message = new Message

  constructor(
    private service: BackendEVOLVEService,
    // private fileService:FileService
  ) { }

  contact: Usuario = new Usuario

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.service.getOne("usuario", 1202)
    this.loggedUser.chats = await this.service.getChatsByUserId(this.loggedUser.id)

    console.log(this.loggedUser)

    this.fotoPerfilUrl = this.loggedUser.fotoPerfil

    // this.contact = chat.getContactFromUser(user)
    console.log(this.getContactFromUser(this.loggedUser.chats[0], this.loggedUser))

    this.newMessage

  }

  // Omit<UserChat, "message">
  async sendMessage(): Promise<void> {

    let messageDate: Date = new Date()

    let sender = new Usuario()
    sender.id = this.loggedUser.id
    this.newMessage.sender = sender
    //rever o status da mensagem
    this.newMessage.date = messageDate.toISOString()

    // type messageDTO = Omit<Message, "id">


    // let sendingMessage: messageDTO = {
    //   content: this.newMessage.content,
    //   date: this.newMessage.date,
    //   messageStatus: this.newMessage.messageStatus,
    //   sender: sender
    // }

    // console.log("é qui msm n tem jeito")
    // console.log(sendingMessage)

    this.loggedUser.chats[0].messages.push(this.newMessage)

    console.log(this.loggedUser.chats[0].messages)

    console.log(await this.service.putUserChat(this.loggedUser.chats[0]))

    this.newMessage = new Message

  }

  getContactFromUser(chat: UserChat, user: Usuario) {
    if (chat.users[0] != user) {
      return chat.users[0]
    }
    return chat.users[1]
  }

}
