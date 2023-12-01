import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/model/chat';
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

  user:Usuario = new Usuario
  fotoPerfilUrl:string = ""


  constructor(
    private service:BackendEVOLVEService,
    // private fileService:FileService
    ) { }

contact:Usuario = new Usuario

  async ngOnInit(): Promise<void> {
    this.user = await this.service.getOne("usuario",1202 )
    this.user.chats = await this.service.getChatsByUserId(this.user.id)
    console.log(this.user.chats)
    console.log(this.user)
  
    this.fotoPerfilUrl = this.user.fotoPerfil

    // this.contact = chat.getContactFromUser(user)
    console.log( this.getContactFromUser(this.user.chats[0],this.user))

    console.log(this.fotoPerfilUrl)
   
  }

  getContactFromUser(chat:UserChat, user:Usuario){
    if(chat.users[0]!=user){
      return chat.users[0]
    }
    return chat.users[1]
  }

}
