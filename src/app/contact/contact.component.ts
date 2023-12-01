import { Component, OnInit, Input } from '@angular/core';
import { UserChat } from 'src/model/userChat';
import { Usuario } from 'src/model/usuario';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

@Input() chat:UserChat = new UserChat
@Input() contact:Usuario = new Usuario

  constructor() { }

  ngOnInit(): void {
  }

}
