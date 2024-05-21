import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Project } from 'src/model/project';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { UserProject } from 'src/model/userProject';
import { UserTeam } from 'src/model/userTeam';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-add-member-to-project-modal',
  templateUrl: './add-member-to-project-modal.component.html',
  styleUrls: ['./add-member-to-project-modal.component.scss']
})
export class AddMemberToProjectModalComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private cookies_service : CookiesService) { }

  @Input() project !: Project
  searchTerm = ''
  team !: Team
  @Input() modalOpen : boolean = false
  @Output() closeModalAddMember : EventEmitter<boolean> = new EventEmitter
  loggedUser : User = new User;

  async ngOnInit() {
    this.team = await this.service.getOne("team", this.project.team.id);
    this.loggedUser = await this.cookies_service.getLoggedUser();
    console.log(this.team);
  }


  removeProjectMembersFromTeamParticipants(user: User): boolean {
    const isUserInProjectMembers = this.project.members.some(userProject => userProject.userId === user.id);

    return !isUserInProjectMembers;
  }

  adicionar(user:User){
    if(this.removeProjectMembersFromTeamParticipants(user)){
      this.addUser(user)
    }
  }

  async addUser(user:User){
    let userProject: UserProject = new UserProject
    userProject.user = user
    //userProject.project = this.project
    userProject.userId = user.id
    userProject.projectId = this.project.id

    this.project.members.push(userProject)
    console.log(this.project.members);
    
    let project:Project = await this.service.patchProjectMembers(this.project.id, this.project.members)
    this.project.members = project.members
    
    // let postProject:any = this.project
    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     let lista: Array<Pick<User, "id">> = [];
    //     this.project.members.forEach(element => {
    //       lista.push({ "id": element.id });
    //     });
    //     postProject.members = lista;
    //     postProject.image = null;
    //     resolve();
    //   });
    // });

    // let project = await this.service.addUserToProject(this.project.id, user.id ,this.loggedUser.id);
    // this.project.members = project.members
  }

  filteredNames():UserTeam[] {
    this.moveCreatorToFirst()
    return this.team?.participants?.filter(element => element?.user?.email?.toLowerCase()?.startsWith(this.searchTerm?.toLowerCase()) || element?.user?.name?.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  }

  findProjectCreator(project:Project):User{
    return project.members.find(userProject => userProject.manager)?.user!
  }

  moveCreatorToFirst() {
    const creator = this.project.members.find(userProject => userProject.userId === this.findProjectCreator(this.project).id);

    if (creator) {
        const membersWithoutCreator = this.project.members.filter(userProject => userProject.userId !== this.findProjectCreator(this.project).id);
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
