import { Component,EventEmitter,Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { async } from '@angular/core/testing';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { cloneDeep } from 'lodash';
import { UserProject } from 'src/model/userProject';
import { Task } from 'src/model/task';

import { CookiesService } from 'src/service/cookies-service.service';

interface Tarefa{
  nome : string,
  prazo : String,
  progresso : number,
  status : string
}

@Component({
  selector: 'app-projeto-remastered',
  templateUrl: './projeto-remastered.component.html',
  styleUrls: ['./projeto-remastered.component.scss']
})
export class ProjetoRemasteredComponent implements OnInit, OnChanges {

  constructor(private route:Router, private service:BackendEVOLVEService, private sanitizer: DomSanitizer, private cookies_service : CookiesService) { }

  isVisibleSubscription !: Subscription
  tarefas : Tarefa[] = []
  hasPermission : boolean = false;
  loggedUser : User = new User;
  loggedUserProject !: UserProject;
  
  @Input() projeto!:Project;
  
  async ngOnChanges(changes: SimpleChanges) {
    if (changes['resetProject'] && changes['resetProject'].currentValue && !this.projeto.editOn) {
      this.cancelEdit();
    }
    if (changes['projeto'] && changes['projeto'].currentValue && !changes['projeto'].firstChange) {
      const newVisibility = changes['projeto'].currentValue.isVisible;
      if (!newVisibility) {
        this.cancelEdit();
      }
    }
  }

  async ngOnInit() {
    this.projeto.editOn = false
    this.loggedUser = await this.cookies_service.getLoggedUser();
    this.loggedUserProject = this.projeto.members.find(userProject => userProject.user.id == this.loggedUser.id)!;

    if(this.loggedUserProject.role.name != "PROJECT_COLABORATOR" && this.loggedUserProject.role.name != "PROJECT_VIEWER" && this.loggedUserProject.role.name != "PROJECT_ADM"){
      this.hasPermission = true;
    }
  }

  date: string = ''
  progresso = 0
  md: any
  corAtual: string = ''
  temporaryImage: string = ''
  valorProgresso = 0;
  teste:string = ''
  imagemBlob!:Blob
  preImage:SafeUrl | undefined = '';
  projetoSave !: Project
  searchTerm : string = ''
  listIdsFromRemove = new Array<UserProject>;
  
  @Input() resetProject : Boolean = false
  
  @Input() projectOpen !: Boolean

  @Input() confirmationAction !: Boolean | any

  @Output() noCloseProject : EventEmitter<any> = new EventEmitter()

  @Output() deletar:EventEmitter<number> = new EventEmitter<number>()

  @Output() openProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Output() salvarProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Output() editProject: EventEmitter<Boolean> = new EventEmitter<Boolean>()
  
  @Output() resetProjectOff: EventEmitter<Boolean> = new EventEmitter<Boolean>()

  @Output() MultipartFile: EventEmitter<FormData> = new EventEmitter<FormData>()

  @Output() quest: EventEmitter<string> = new EventEmitter<string>()

  @Output() listFromRemove: EventEmitter<Array<UserProject>> = new EventEmitter<Array<UserProject>>()

  @Output() openTaskModal: EventEmitter<Task> = new EventEmitter<Task>()


  openAgain(){
    this.noCloseProject.emit()
  }

  verifyImg(user:User){
    if(user?.image != null){
      if(user.image.data != null){
        return false
      }
    }
    return true
  }

  async alterarTarefaFavoritado(){
    this.projeto.favorited = !this.projeto.favorited;
    await this.service.patchProjectFavorited(this.projeto.id, this.projeto.favorited)
  }

  async salvarTarefa(){
    // await this.service.putProjeto(this.projeto, this.loggedUser.id);
    await this.service.putProjeto(this.projeto);
    //REVER
  }

  filteredNames():UserProject[] {
    return this.projeto?.members?.filter(element => element?.user.email?.toLowerCase()?.startsWith(this.searchTerm.toLowerCase()) || element.user.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()));
  }

  openTask(task:Task){
    this.openTaskModal.emit(task)
  }

  async setImageProject(event:any){
    if(event.target.files && event.target.files[0]){
      if(event.target.files[0].type === "image/jpeg" 
      || event.target.files[0].type === "image/webp" 
      || event.target.files[0].type === "image/png"){
        this.imagemBlob = event.target.files[0]
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        this.MultipartFile.emit(formData)

        const blob = new Blob([event.target.files[0]], { type: event.target.files[0].type });

        const imageUrl = URL.createObjectURL(blob);
        this.preImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      }
    }
  }

  deletarProjeto(id:number){
    this.deletar.emit(id)
  }

  async salvaProjeto(){
    this.quest.emit("Tem certeza que deseja salvar as alterações feitas?");
    
    try {
      const confirmation = await this.waitForConfirmation();
      this.confirmationAction = undefined;
      
      if (confirmation) {
        this.projeto.editOn = false
        this.projetoSave = cloneDeep(this.projeto);
        this.salvarProjeto.emit(this.projeto)
        this.editProjectEmit(false)
      }

    } catch (ignore) {}
  }

  getTasksLength(){
    return this.projeto.tasks.length
  }

  openEfechaProjeto(){
    if(!this.projeto.editOn){
      this.openProjeto.emit(this.projeto)
    }
  }

  editProjectEmit(bol:Boolean){
    this.sendList();
    this.editProject.emit(bol)
  }

  sendList(){
    this.listFromRemove.emit(this.listIdsFromRemove)
  }

  editOn(bol:Boolean){
    this.projetoSave = cloneDeep(this.projeto);
    this.editProjectEmit(bol)
  }

  async irParaProjeto(projectId: number){
    this.route.navigate(['view-project', projectId])
  }

  cancelEdit(){
    setTimeout(() => {
      if(this.projetoSave != null){
        this.projeto.name = this.projetoSave.name
        this.projeto.description = this.projetoSave.description
        this.projeto.finalDate = this.projetoSave.finalDate
        this.projeto.members = this.projetoSave.members
        this.projeto.tasks = this.projetoSave.tasks
        this.projeto.editOn = false
        this.preImage = ''
        this.editProjectEmit(false)
        this.resetProjectOff.emit(false)
      }
    })
  }

  async removeMember(user:UserProject) {
    if(user?.user.id != this.getProjectCreator(this.projeto).id){
      this.quest.emit("Realmente deseja remover um membro?");
  
      try {
        const confirmation = await this.waitForConfirmation();
        this.confirmationAction = undefined;

        if (confirmation) {
          this.projeto.members.splice(this.projeto.members.indexOf(this.projeto.members.find(member => member.userId == user.user.id)!), 1)
          this.listIdsFromRemove.push(
            user
          )
        }

      } catch (ignore) {}
    }
  }


  getProjectCreator(project:Project):User{
    return project.members.find(userProject => userProject.manager)!.user
  }
  

  verifyIsCreator(p:User){
    if(p.id != this.getProjectCreator(this.projeto).id){
      return true
    }
    return false
  }
  
  waitForConfirmation(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let timer: ReturnType<typeof setTimeout>;
      let intervalId: ReturnType<typeof setInterval>;
  
      timer = setTimeout(() => {
        clearInterval(intervalId);
      }, 30000);
  
      intervalId = setInterval(() => {
        if (typeof this.confirmationAction !== "undefined") {
          clearTimeout(timer);
          clearInterval(intervalId);
          resolve(this.confirmationAction as boolean);
        }
      }, 100);
    });
  }

}
