import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.scss']
})
export class TelaCadastroComponent implements OnInit {

  usuario : User = new User();

  constructor(private service : BackendEVOLVEService) { 
    
  }

  ngOnInit(): void {
  }

  async cadastrarUsuario() : Promise<void> {
    this.usuario.imageColor = this.randomizeColor()
    await this.service.postUsuario(this.usuario)
  }

  randomizeColor(){
    let str = '#';
    while (str.length < 7) {
      str += Math.floor(Math.random() * 0x10).toString(16);
    }
    return str.toUpperCase()
  }

}
