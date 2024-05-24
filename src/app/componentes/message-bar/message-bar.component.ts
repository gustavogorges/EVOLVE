import { Component, Input, OnInit } from '@angular/core';
import { MessageDTO } from 'src/model/DTO/messageDTO';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { MessageStatus } from 'src/model/messageStatus';
import { Message } from 'src/model/message';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {

  @Input() loggedUser = new User
  @Input() chat = new UserChat
  newMessage: MessageDTO = new MessageDTO

  constructor(private service:BackendEVOLVEService) { }

  ngOnInit(): void {
  }

  async sendMessage(): Promise<void> {
    if(this.newMessage.content.length>0 || this.newMessage.attachments.length>0){

      let messageDate: Date = new Date()
      messageDate.setHours(new Date().getHours()-3)
  
      let sender = new User()
      sender.id = this.loggedUser.id
  
      this.newMessage.sender = sender
  
      this.newMessage.chatId = this.chat.id
  
      //mudar status ao receber mensagem (backend?)
      this.newMessage.status = MessageStatus.AWAITING
  
      this.newMessage.date = messageDate.toISOString()
      
  
      let sentMessage:Message = await this.service.postMessage(this.newMessage)
      this.chat.messages.push(sentMessage)
  
      this.newMessage = new  MessageDTO
      window.location.reload()
    }

  }

}
