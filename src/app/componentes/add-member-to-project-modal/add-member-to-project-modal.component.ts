import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-add-member-to-project-modal',
  templateUrl: './add-member-to-project-modal.component.html',
  styleUrls: ['./add-member-to-project-modal.component.scss']
})
export class AddMemberToProjectModalComponent implements OnInit {

  constructor(private service : BackendEVOLVEService) { }

  @Input() project !: Project
  searchTerm = ''
  team !: Team
  @Input() modalOpen : boolean = false
  @Output() closeModalAddMember : EventEmitter<boolean> = new EventEmitter

  async ngOnInit() {
    this.team = await this.service.getOne("team", this.project.team.id)
    console.log(this.team);
  }


  removeProjectMembersFromTeamParticipants(user: User): boolean {
    const isUserInProjectMembers = this.project.members.some(member => member.id === user.id);

    return !isUserInProjectMembers;
  }

  adicionar(user:User){
    if(this.removeProjectMembersFromTeamParticipants(user)){
      this.addUser(user)
    }
  }

  async addUser(user:User){
    this.project.members.push(user)
    
    let postProject:any = this.project
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        let lista: Array<Pick<User, "id">> = [];
        this.project.members.forEach(element => {
          lista.push({ "id": element.id });
        });
        postProject.members = lista;
        postProject.image = null;
        resolve();
      });
    });
    let project = await this.service.putProjeto(postProject);
    this.project.members = project.members
  }

  filteredNames() {
    this.moveCreatorToFirst()
    return this.team?.participants?.filter(element => element?.email?.toLowerCase()?.startsWith(this.searchTerm?.toLowerCase()) || element.name?.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  }

  moveCreatorToFirst() {
    const creator = this.project.members.find(member => member.id === this.project.creator.id);

    if (creator) {
        const membersWithoutCreator = this.project.members.filter(member => member.id !== this.project.creator.id);
        const updatedMembers = [creator, ...membersWithoutCreator];
        return updatedMembers;
    } else {
        return this.project.members;
    }
  }

  verifyImage(user:User) {
    // if(this.user.image){
    //   return false
    // } else if(this.user.imageColor){
    //   return true
    // }
    // return true
    if (user.image != null) {
      if (user.image.data != null) {
        return false
      }
    }
    return true
  }

}
