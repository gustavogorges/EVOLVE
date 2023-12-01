import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/model/chat';
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

  async ngOnInit(): Promise<void> {
    this.user = await this.service.getOne("usuario",1202 )
    this.user.chats = await this.service.getChatsByUserId(this.user.id)
    console.log(this.user.chats)
    console.log(this.user)
  
    this.fotoPerfilUrl = this.user.testeImagem

    console.log(this.fotoPerfilUrl)
   
  }

}
