import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/model/chat';
import { Message } from 'src/model/message';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';

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

  constructor() { }

  ngOnInit(): void {
    this.messageAlignment = "end"
    this.senderImagePointerAlignment = "right"
    this.messagePointerLoggedUser = true
    this.showSenderImagePointer = false
    console.log(this.message.sender)
  }

  previousMessageIsFromLoggedUser(currentMessageIndex:Number):Boolean{
    let messages:Array<Message> =  this.chat.messages
    let previousMessageIndex:number = currentMessageIndex.valueOf() - 1 
    if(previousMessageIndex >= 0){
      return messages[previousMessageIndex].sender.id == this.loggedUser.id
    }
    return false

  }

  showImage(message:Message):Boolean{

    let messageIndex:Number = this.chat.messages.indexOf(message)

    // console.log(message)
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
      this.messagePointerLoggedUser = true
    } else {
      this.messageAlignment = "start"
      this.senderImagePointerAlignment = "left"
      this.messagePointerLoggedUser = false
    }

  }

}
