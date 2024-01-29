import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Query, Renderer2, ViewChild } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
@Component({
  selector: 'app-membros-equipe',
  templateUrl: './membros-equipe.component.html',
  styleUrls: ['./membros-equipe.component.scss']
})
export class MembrosEquipeComponent implements OnInit {

  constructor(private renderer : Renderer2, private service: BackendEVOLVEService) { }

  adicionado = false

  @Input() user!:Usuario
  @Input() membros!:Usuario[]
  @Output() adiconarUser:EventEmitter<Usuario[]> = new EventEmitter<Usuario[]>()

  ngOnInit(){
    this.getAllUsers()
  }

  verifyImage(){
    if(this.user.fotoPerfil.length>10){
      return false
    }else{
      return true
    }
  }

  usuarios!:Usuario[]
  
  async getAllUsers(){
    this.usuarios = await this.service.getAllSomething('usuario')
  }

  adicionar(){
    this.adicionado = !this.adicionado
    if(this.adicionado){
      this.addUser()
    }else{
      this.removeUser()
    }
  }

  addUser(){
    this.membros.push(this.user)
    this.arrayAlterada()
  }

  arrayAlterada(){
    this.adiconarUser.emit(this.membros)
  }

  removeUser(){
    this.membros.splice(this.membros.indexOf(this.user), 1)
    this.arrayAlterada()

  }

}
