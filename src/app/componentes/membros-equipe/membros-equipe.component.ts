import { Component, Input, OnInit } from '@angular/core';
import { File } from 'src/model/file';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { UserProject } from 'src/model/userProject';
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
    this.moveCreatorToFirst()
  }

  addUser(){
    let userProject:any = new UserProject
    setTimeout(() => {
      userProject.project = this.projeto.id
      userProject.user = this.user.id
      userProject.projectId = this.projeto.id
      userProject.userId = this.user.id
      userProject.role = this.projeto.defaultRole
      this.projeto.members.push(userProject)
    });
  }

  removeUser(){
    this.projeto.members.map(member => member.user).forEach(element => {
      if(element.id === this.user.id){
        this.projeto.members.splice(this.projeto.members.indexOf(this.projeto.members.find(member => member.userId == element.id)!), 1)
      }
    });
  }

  findProjectCreator(project:Project):User{
    return project.members.find(userProject => userProject.manager)?.user!
  }

  moveCreatorToFirst() {
    const creator = this.projeto.members.find(userProject => userProject.userId === this.findProjectCreator(this.projeto).id);
    if (creator) {
        const membersWithoutCreator = this.projeto.members.filter(userProject => userProject.userId !== this.findProjectCreator(this.projeto).id);
        const updatedMembers = [creator, ...membersWithoutCreator];
        return updatedMembers;
    } else {
        return this.projeto.members;
    }
}

}
