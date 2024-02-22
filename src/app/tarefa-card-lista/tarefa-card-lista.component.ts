import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

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

 constructor(private service : BackendEVOLVEService ) {

  }

  ngOnInit(): void {
   this.trocaCor()
   if(this.tarefaAtual.favorited){
     this.caminhoEstrela = "assets/estrelaMarcada.svg"
   }else{
     this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
   }
   this.valorBarra = 60 +"%"; 
   console.log(this.tarefaAtual.id + " "+this.tarefaAtual.currentStatus)
 
 }

 favoritar(){
   if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
     this.caminhoEstrela = "assets/estrelaMarcada.svg"
     this.tarefaAtual.favorited=true;
   } else {
     this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
     this.tarefaAtual.favorited=false;

   }
   console.log(this.tarefaAtual)
  this.tarefaAtual.project = {
    id : this.project.id
  }
  console.log(this.caminhoEstrela)
  console.log(this.service.putTarefa(this.tarefaAtual))
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



}
