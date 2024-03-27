  import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/model/project';
import { Subtask } from 'src/model/subtask';
  import { Task } from 'src/model/task';
  import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

  @Component({
    selector: 'app-tarefa-card-padrao',
    templateUrl: './tarefa-card-padrao.component.html',
    styleUrls: ['./tarefa-card-padrao.component.scss']
  })
  export class TarefaCardPadraoComponent  {
  @Input() tarefaAtual!:Task

  valorBarra="0%";
    caminho = "assets/estrelaMarcada.svg"
    caminhoEstrela="assets/estrelaNaoMarcada.svg"
    nomeGrande ="";
    corStatus=""; 
    @Input() id: string = "";
    @Input() project !: Project
    @Output() newItem = new EventEmitter<boolean>();
    teste !:string;

  data : Date = new Date

  

    constructor(private service : BackendEVOLVEService ) {
  
    }

    async ngOnInit(): Promise<void> {
  
      this.trocaCor()
      if(this.tarefaAtual.favorited){
        this.caminhoEstrela = "assets/estrelaMarcada.svg"
      }else{
        this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
      }
      this.valorBarra = 60 +"%"; 
  
    
    }

    async favoritar(event: MouseEvent){
      event.stopPropagation();

      if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
        this.caminhoEstrela = "assets/estrelaMarcada.svg"
        this.tarefaAtual.favorited=true;
      } else {
        this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
        this.tarefaAtual.favorited=false;

      }
      this.tarefaAtual.project = {
        id : this.project.id
      }
       await this.service.putTarefa(this.tarefaAtual)
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
    async completed(sub : Subtask){
      console.log(sub);
      if(sub.concluded){
        sub.concluded=false;
      }else{
        sub.concluded=true;
      }
      console.log(sub);
      this.tarefaAtual.subtasks.map((s)=>{
        if(s.id ==sub.id){
          s.concluded=sub.concluded
        }
      })

      await this.service.putTarefa(this.tarefaAtual); 
      
      }
      
    }




