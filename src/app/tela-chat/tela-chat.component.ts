import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { FileService } from 'src/service/file.service';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})
export class TelaChatComponent implements OnInit {

  usuario:Usuario = new Usuario
  fotoPerfilUrl:string = ""

  constructor(
    private service:BackendEVOLVEService,
    private fileService:FileService
    ) { }

  async ngOnInit(): Promise<void> {
    this.usuario = await this.service.getOne("usuario",1202 )
    console.log(this.usuario)

    this.fotoPerfilUrl = this.usuario.testeImagem

    // this.fotoPerfilUrl = "data:image/jpeg;base64," + this.usuario.testeImagem
    // this.fileService.convertByteStringToBase64(this.usuario.testeImagem)
    console.log(this.fotoPerfilUrl)
   
  }

}
