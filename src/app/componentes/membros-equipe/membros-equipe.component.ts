import { Component, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
@Component({
  selector: 'app-membros-equipe',
  templateUrl: './membros-equipe.component.html',
  styleUrls: ['./membros-equipe.component.scss']
})
export class MembrosEquipeComponent implements OnInit {

  constructor(private service: BackendEVOLVEService) { }

  adicionado = false

  @Input() user!:User
  @Input() projeto!:Projeto

  ngOnInit(){
    this.projeto.members.forEach(element => {
      if(element.id === this.user.id){
        this.adicionado = true
      }
    });
  }

  verifyImage(){
    if(this.user.profilePicture.length>10){
      return false
    }else{
      return true
    }
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
    this.projeto.members.push(this.user)
    this.arrayAlterada()
  }

  async arrayAlterada(){
    await this.service.putProjeto(this.projeto)
  }

  removeUser(){
    this.projeto.members.forEach(element => {
      if(element.id === this.user.id){
        this.projeto.members.splice(this.projeto.members.indexOf(element), 1)
      }
    });
    this.arrayAlterada()
  }

}
