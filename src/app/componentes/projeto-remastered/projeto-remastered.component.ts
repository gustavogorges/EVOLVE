import { Component,EventEmitter,Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { async } from '@angular/core/testing';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

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

  constructor(private route:Router, private service:BackendEVOLVEService, private sanitizer: DomSanitizer) { }

  
  tarefas : Tarefa[] = []
  
  @Input() projeto!:Project;
  
  ngOnChanges(): void {
    if(!this.projeto.editOn && this.resetProject){
      this.cancelEdit()
    }
  }
  ngOnInit(): void {
    console.log(this.projeto.tasks);
    
  }

  date: string = ''
  progresso = 0
  md: any
  corAtual: string = ''
  temporaryImage: string = ''
  valorProgresso = 0;
  teste:string = ''
  imagemBlob!:Blob
  preImage:SafeUrl | undefined;
  
  
  @Input() resetProject : Boolean = false
  
  @Input() projectOpen !: Boolean

  @Output() noCloseProject : EventEmitter<any> = new EventEmitter()

  @Output() deletar:EventEmitter<number> = new EventEmitter<number>()

  @Output() openProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Output() salvarProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Output() editProject: EventEmitter<Boolean> = new EventEmitter<Boolean>()
  
  @Output() resetProjectOff: EventEmitter<Boolean> = new EventEmitter<Boolean>()

  @Output() MultipartFile: EventEmitter<FormData> = new EventEmitter<FormData>()


  openAgain(){
    this.noCloseProject.emit()
  }

  verifyImg(user:User){
    if(user.image != null){
      if(user.image.data != null){
        return false
      }
    }
    return true
  }

  verifyImgproject(){
    if(this.projeto.image != null){
      if(this.projeto.image.data != null){
        return false
      }
    }
    return true
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

        // Criar URL segura da imagem
        const imageUrl = URL.createObjectURL(blob);
        this.preImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      }
    }
  }

  deletarProjeto(id:number){
    this.deletar.emit(id)
  }

  salvaProjeto(){
    this.salvarProjeto.emit(this.projeto)
    this.editProjectEmit(false)
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
    this.editProject.emit(bol)
  }

  async irParaProjeto(){
    this.route.navigate(['tela-tarefa'])
  }

  async cancelEdit(){
      setTimeout(async()   => {
      var projeto = await this.service.getOne("project", this.projeto.id) as Project
      this.projeto.name = projeto.name
      this.projeto.description = projeto.description
      this.projeto.finalDate = projeto.finalDate
      this.editProjectEmit(false)
    }, 500);
    this.resetProjectOff.emit(false)
  }

}
