import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-chat',
  templateUrl: './tela-chat.component.html',
  styleUrls: ['./tela-chat.component.scss']
})
export class TelaChatComponent implements OnInit {

  usuario:Usuario = new Usuario
  fotoPerfilUrl:string = ""

  constructor(private service:BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.usuario = await this.service.getOne("usuario",1202 )
    console.log(this.usuario)
   
      // Converta a string de bytes em um array de bytes
      const byteCharacters = atob(this.usuario.testeImagem);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Converta o array de bytes em uma URL Data (DataURL)
      this.fotoPerfilUrl = this.convertArrayBufferToBase64(byteArray);
   
    
  }

  // Método para converter array de bytes em uma URL Data (DataURL)
  convertArrayBufferToBase64(buffer: Uint8Array): string {
    const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  }

}
