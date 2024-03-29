import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/model/chat';
import { Message } from 'src/model/message';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';
import { TelaChatComponent } from 'src/app/tela-chat/tela-chat.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() chat:Chat = new UserChat

  @Input() loggedUser:User = new User
  @Input() message:Message = new Message

  messageAlignment:string = "end"
  senderImagePointerAlignment:String = "right"
  messagePointerLoggedUser:boolean = true
  showSenderImagePointer:boolean = false

  messageInfoAlignment:string = "space-between"

  constructor(private cookieService:CookiesService) { }

  ngOnInit(): void {
    this.messageAlignment = "end"
    this.senderImagePointerAlignment = "right"
    this.messagePointerLoggedUser = true
    this.showSenderImagePointer = false
  }

  isLastMessageSenderDiferentFromCurrentMessageSender(currentMessage:Message):Boolean{
    let messages:Array<Message> =  this.chat.messages
    let currentMessageIndex:number = this.chat.messages.indexOf(currentMessage)
    let previousMessageIndex:number = currentMessageIndex - 1

    return previousMessageIndex >= 0 &&  
    messages[previousMessageIndex].sender.id != messages[currentMessageIndex].sender.id
  }

  showImage(message:Message):Boolean{

    this.setMessageAlignment(message)

    if(this.isLastMessageSenderDiferentFromCurrentMessageSender(message)){
      this.showSenderImagePointer = true
      return true
    }

    let isFirstMessage:boolean = this.chat.messages[0] == message
    this.showSenderImagePointer = isFirstMessage
    return isFirstMessage
  }

  setMessageAlignment(message:Message):void{

    if(message.sender.id == this.loggedUser.id){
      this.messageAlignment = "end"
      this.senderImagePointerAlignment = "right"
      this.messagePointerLoggedUser = true
    } else {
      this.messageAlignment = "start"
      this.senderImagePointerAlignment = "left"
      this.messagePointerLoggedUser = false
    }
    if(this.showName()){
      this.messageInfoAlignment = "space-between"
    } else if(message.sender.id == this.loggedUser.id){
      this.messageInfoAlignment = "flex-end"
    } else {
      this.messageInfoAlignment = "flex-start"
    }
  }

  showName(){
    let chatTypeUsers:string = "users"
    let chatType = this.cookieService.get(this.cookieService.chatListTypeField)
    return chatType!=chatTypeUsers
  }

}
