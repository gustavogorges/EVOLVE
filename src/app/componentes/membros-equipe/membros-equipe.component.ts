import { Component, Input, OnInit } from '@angular/core';
import { File } from 'src/model/file';
import { Project } from 'src/model/project';
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
  @Input() projeto!:Project

  ngOnInit(){
  }

  verifyImage(){
    // if(this.user.image){
    //   return false
    // } else if(this.user.imageColor){
    //   return true
    // }
    // return true
    if(this.user.image != null){
      if(this.user.image.data != null){
        return false
      }
    }
    return true
  }

  randomizeColor(){
    let str = '#';
    while (str.length < 7) {
      str += Math.floor(Math.random() * 0x10).toString(16);
    }
    return str.toUpperCase()
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
    console.log(this.projeto);
    
  }


  removeUser(){
    this.projeto.members.forEach(element => {
      if(element.id === this.user.id){
        this.projeto.members.splice(this.projeto.members.indexOf(element), 1)
      }
    });
  }

}
