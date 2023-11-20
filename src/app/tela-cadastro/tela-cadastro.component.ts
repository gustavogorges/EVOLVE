import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.scss']
})
export class TelaCadastroComponent implements OnInit {

  usuario : Usuario = new Usuario();

  constructor(private service : BackendEVOLVEService) { 
    
  }

  ngOnInit(): void {
  }

  async cadastrarUsuario() : Promise<void> {
    await this.service.postUsuario(this.usuario)
  }

}
