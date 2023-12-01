import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { Status } from 'src/model/status';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';



@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {

  projetoCriado:Projeto = new Projeto;

  constructor(private service : BackendEVOLVEService){}

  ngOnInit(): void {
    this.criaProjeto()
    this.getMembros()
    // let membros = localStorage.getItem('membros') || ''
    // this.membros.push(JSON.parse(membros))
  }

  async criaProjeto(){
    this.projetoStatus = await this.service.postProjeto(this.projeto)
  }

  @Input() projeto!:Projeto
  projetoStatus !: Projeto

  usuarios!: Usuario[]

  async getMembros(){
    this.usuarios = await this.service.getAllSomething('usuario')
  }

  salvarProjeto(){
    this.projeto.membros = this.membros
    this.service.putProjeto(this.projeto)
  }

  addUser(p:Usuario[]){
    // console.log(p.email)
    this.membros = p
    // localStorage.setItem('membros',JSON.stringify(this.membros))
  }

  membros: Usuario[] = []

  

}
