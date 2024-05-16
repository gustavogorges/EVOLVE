import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { Team } from 'src/model/team';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private cookieService : CookiesService, private router: Router, private elementRef: ElementRef) { }
  search = ''
  loggedUser !: User
  projectsList !: Project[]
  tasksList !: Task[]
  teamsList !: Team[]
  usersList !: User[]
  open: boolean = false
  @Output() openTaskMdal : EventEmitter<Task> = new EventEmitter

  async ngOnInit(){
    this.loggedUser = await this.cookieService.getLoggedUser().then((user)=>{return user}) 
    document.body.addEventListener('click', this.onDocumentClick);

    setTimeout(async () => {
      this.projectsList = await this.service.getProjectsByUserId(this.loggedUser.id)
      this.tasksList = await this.service.getTasksByUserId(this.loggedUser.id)
      this.teamsList = await this.service.getTeamsByUserId(this.loggedUser.id)
      this.usersList = await this.service.getAllSomething("user")
    });
  }

  onDocumentClick = (event: MouseEvent) => {
    
    if (!this.elementRef.nativeElement.contains(event.target)) {
        this.search = ''
        this.open = false
    }else{
      this.open = true
    }
  };

  goUser( user : User){
    this.router.navigate(['/tela-perfil/'+user.id]);
    this.search = ''
  }

  goProject( project : Project){
    this.router.navigate(['/view-project/'+project.id]);
    this.search = ''

  }

  goTeam( team : Team){
    this.router.navigate(['/tela-projeto/'+team.id]);
    this.search = ''

  }

  openTask(event: MouseEvent, task : Task){
    setTimeout(() => {
      event.stopPropagation();
      this.search = ''
      this.open = false 
    });
    setTimeout(() => {
      this.openTaskMdal.emit(task)
    });
  }

  verifyLenght(array:any[]){
    if(array?.length > 0){
      return true
    }
    return false
  }

  verifyImage(object:any){
    if(object.image != null){
      if(object.image.data != null){
        return false
      }
    }
    return true
  }

  filterProjects() {
    const searchText = this.search.toLowerCase();
    return searchText.toLowerCase().includes("pr") ? this.projectsList : this.projectsList?.filter(project =>
      project.name.toLowerCase().includes(searchText)
    ).slice(0, 4)
  }

  filterTasks() {
    const searchText = this.search.toLowerCase();
    return searchText.toLowerCase().includes("ta") ? this.tasksList : this.tasksList?.filter(task =>
      task?.name?.toLowerCase().includes(searchText)
    ).slice(0, 4)
  }

  filterTeams() {
    const searchText = this.search.toLowerCase();
    return searchText.toLowerCase().includes("eq") ? this.teamsList : this.teamsList?.filter(team =>
      team?.name?.toLowerCase().includes(searchText)
    ).slice(0, 4)
  }

  filterUsers() {
    const searchText = this.search.toLowerCase();
    return this.usersList?.filter(user =>
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText)
    ).slice(0, 4);
  }
}
