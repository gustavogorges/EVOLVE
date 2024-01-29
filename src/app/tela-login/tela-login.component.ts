import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss'],
})
export class TelaLoginComponent implements OnInit {
  usuario: Usuario = new Usuario();

  email: string = '';
  senha: string = '';

  constructor(private router: Router, private service: BackendEVOLVEService) {}

  ngOnInit(): void {}

  async login(): Promise<void> {
    this.usuario = await this.service.getUser(this.email);
    if (this.usuario.senha == this.senha) {
      this.router.navigate(['/tela-inicial'], { state: { user: this.usuario } });
    }
  }

  cadastro(): void {
    console.log('foi');
    this.router.navigate(['/tela-cadastro']);
  }
}
