import { Component, Input, OnInit } from '@angular/core';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { UserChat } from 'src/model/userChat';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {

  @Input() loggedUser = new Usuario
  @Input() chat = new UserChat
  newMessage: MessageDTO = new MessageDTO

  constructor(private service:BackendEVOLVEService) { }

  ngOnInit(): void {
  }

  async sendMessage(): Promise<void> {

    let messageDate: Date = new Date()

    let sender = new Usuario()
    sender.id = this.loggedUser.id

    this.newMessage.sender = sender

    this.newMessage.chatId = this.chat.id

    //mudar status ao receber mensagem (backend?)
    this.newMessage.messageStatus = 0

    this.newMessage.date = messageDate.toISOString()

    console.log(await this.service.postMessage(this.newMessage))

    this.newMessage = new MessageDTO

  }

}
