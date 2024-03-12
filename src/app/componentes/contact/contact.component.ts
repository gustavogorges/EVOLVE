import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/model/message';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';
import { Team } from 'src/model/team';
import { Project } from 'src/model/project';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

@Input() chat:UserChat = new UserChat
@Input() contact:User|Team|Project = new User

lastMessage:Message = new Message

image:String = ""
name:String = ""

  constructor() { }

  ngOnInit(): void {
    console.log(this.chat)
    let lastMessageIndex = this.chat.messages.length - 1
    this.lastMessage = this.chat.messages[lastMessageIndex]
    this.name = this.contact.name
    // this.image = this.contact.image

    // this.setContactInfo()
  }

  isImageAHex(){
    console.log(this.image)
    return this.image?.slice()[0]!='#'
  }

  // setContactInfo(){
  //   if(this.contact instanceof User){
  //     this.image = this.contact.profilePicture
  //   } else {
  //     this.image = this.contact.image
  //   }
  //   this.name = this.contact.name
  // }

}
