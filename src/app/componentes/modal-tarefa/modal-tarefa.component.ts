import { Component, Input, OnInit } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { Status } from 'src/model/status';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-modal-tarefa',
  templateUrl: './modal-tarefa.component.html',
  styleUrls: ['./modal-tarefa.component.scss']
})
export class ModalTarefaComponent implements OnInit {
  booleanDesc:boolean = false;
  page_task:string = "sub-tarefas";
  nomeGrande : string = "";
  editBoolean : boolean = false;
  booleanEdit:boolean = false;
  booleanStatus:boolean = false;
  booleanCalendario:boolean = false;
  booleanDescription:boolean = false;
  statusAntigo:Status = new Status;
  descricaoAntiga:string = "";

  
  constructor(
    private service : BackendEVOLVEService
  ) { }
@Input() tarefa:Tarefa = new Tarefa
projeto:Projeto = new Projeto

  async ngOnInit (): Promise<void> {
    // this.verificaTamanhoString();
    this.statusAntigo = this.tarefa.statusAtual;
    this.descricaoAntiga = this.tarefa.descricao;
    console.log(this.statusAntigo)
    let projetos = await this.service.getAllSomething("projeto")
    for(let projeto of projetos){
      if(projeto.id == this.tarefa.projeto.id){
        this.projeto = projeto
      }
    }
  }


  openDesc():void {
    this.booleanDesc = !this.booleanDesc;
  }

  changePage(name_page:string):void {
    if(name_page == "sub-tarefas") {
      this.page_task = "sub-tarefas"
    } else if(name_page == "comentarios") {
      this.page_task = "comentarios"
    }  else if(name_page == "historicos") {
      this.page_task = "historicos"
    } else if(name_page == "anexos") {
      this.page_task = "anexos"
    } else if(name_page == "automacao") {
      this.page_task = "automacao"
    } else if(name_page == "integracao") {
      this.page_task = "integracao"
    }
}

verificaTamanhoString(){
  if(this.tarefa.nome.length>20){
    this.nomeGrande = this.tarefa.nome
    let nome = (this.tarefa.nome.split(" ",4)).toString();
    this.tarefa.nome= nome.replace(/,/g, " ")
    console.log(this.tarefa.nome)
  }
}

edit() {
  this.booleanEdit = !this.booleanEdit;
  this.booleanCalendario = !this.booleanCalendario;
}

editStatus() {
  if(this.booleanEdit) {
    this.booleanEdit = true;
    this.booleanStatus = !this.booleanStatus;
  }
  else {
    this.booleanStatus = !this.booleanStatus;
    this.booleanEdit = !this.booleanEdit;
  }
}

editData() {
  this.booleanCalendario = !this.booleanCalendario
  this.booleanEdit = !this.booleanEdit
}

editDescription() {
  console.log(this.editBoolean)
}

booleanEditFalse() {
  this.booleanEdit = false;
  this.booleanCalendario = false;
  this.booleanStatus = false;
  this.tarefa.statusAtual = this.statusAntigo;
  this.tarefa.descricao = this.descricaoAntiga;
}

salvarTarefa() {
  this.service.putTarefa(this.tarefa);
  if(this.booleanCalendario == true) {
    this.booleanCalendario = false;
  }
  if(this.booleanStatus == true) {
    this.booleanStatus = false;
  }
  this.booleanEdit = !this.booleanEdit
}
}
