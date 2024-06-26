import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/model/message';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { Team } from 'src/model/team';
import { Project } from 'src/model/project';
import { TeamChat } from 'src/model/teamChat';
import { File } from 'src/model/file';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

@Input() chat:UserChat|TeamChat = new UserChat
@Input() contact:User|Team|Project = new User

lastMessage:Message = new Message

  image!:File
  imageColor:String = ""
  name:String = ""

  constructor() { }

  getLastMessageContent(){
    return this.lastMessage.content
  }

  ngOnInit(): void {
    this.setlastMessage()
  }

  setlastMessage(){
    let lastMessageIndex = this.chat.messages.length - 1
    this.lastMessage = this.chat.messages[lastMessageIndex]
  }

  setInfos(contact:User|Team|Project){
    this.image = contact.image
    this.imageColor = contact.imageColor
    this.name = contact.name
  }

}
