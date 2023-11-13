import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-tarefa',
  templateUrl: './modal-tarefa.component.html',
  styleUrls: ['./modal-tarefa.component.scss']
})
export class ModalTarefaComponent implements OnInit {
  booleanDesc:boolean = false;
  page_task:string = "sub-tarefas";

  constructor() { }

  ngOnInit(): void {
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
}
