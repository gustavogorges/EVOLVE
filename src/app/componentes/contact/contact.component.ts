import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/model/message';
import { UserChat } from 'src/model/userChat';
import { User } from 'src/model/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

@Input() chat:UserChat = new UserChat
@Input() contact:User = new User

lastMessage:Message = new Message

  constructor() { }

  ngOnInit(): void {
    console.log(this.chat)
    let lastMessageIndex = this.chat.messages.length - 1
    this.lastMessage = this.chat.messages[lastMessageIndex]
  }

}
