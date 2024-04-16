import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-tarefa-card-lista',
  templateUrl: './tarefa-card-lista.component.html',
  styleUrls: ['./tarefa-card-lista.component.scss']
})
export class TarefaCardListaComponent implements OnInit {
  @Input() tarefaAtual!:Task
  valorBarra="0%";
  caminho = "assets/naoVector.svg"
  caminhoEstrela="assets/estrelaNaoMarcada.svg"
  nomeGrande ="";
  corStatus=""; 
  @Input() id: string = "";
  @Input() project !: Project
  @Output() newItem = new EventEmitter<boolean>();


data : Date = new Date

  listaSub = [
   "subtarefa",
   "b",
   "b",
   
 ]     
  arrayForce : Array<User> = new Array;


 constructor(private service : BackendEVOLVEService,
  private cookies_service:CookiesService ) {

  }

  loggedUser : User = new User;


   async ngOnInit(): Promise<void> {
    this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user})
   this.trocaCor()
   if(this.tarefaAtual.favorited){
     this.caminhoEstrela = "assets/estrelaMarcada.svg"
   }else{
     this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
   }
   this.valorBarra = 60 +"%"; 
   console.log(this.tarefaAtual.id + " "+this.tarefaAtual.currentStatus)
   this.arrayForce =  this.tarefaAtual.associates as Array<User> 
   console.log(this.arrayForce);
   
 
 }

 async favoritar(){
   if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
     this.caminhoEstrela = "assets/estrelaMarcada.svg"
     this.tarefaAtual.favorited=true;
   } else {
     this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
     this.tarefaAtual.favorited=false;

   }
   console.log(this.tarefaAtual)

  console.log(this.caminhoEstrela)
   console.log( await this.service.putTarefa(this.tarefaAtual, this.loggedUser.id))
   this.newItem.emit(true);


 }

 trocaCor(){
   if(this.tarefaAtual.currentStatus.name =="pendente"){
     this.corStatus="#7CD5F4"
   }else if(this.tarefaAtual.currentStatus.name =="em progresso"){
     this.corStatus="#FCEC62"
   }else  if(this.tarefaAtual.currentStatus.name =="Concluido"){
     this.corStatus="#86C19F"
   }
   else  if(this.tarefaAtual.currentStatus.name =="não atribuido"){
     this.corStatus="#9CA3AE"
   }
   
 }
 getUserStyles(user: any): any {
  let styles: any = {};

  if(user.image!=null){
    styles['background'] = user.imageColor;
  }
  styles['background-color'] = user.imageColor;
    
  
  return styles;
}



}
