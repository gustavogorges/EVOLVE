import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-tarefa',
  templateUrl: './modal-tarefa.component.html',
  styleUrls: ['./modal-tarefa.component.scss']
})
export class ModalTarefaComponent implements OnInit {
  booleanDesc:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openDesc():void {
    this.booleanDesc = !this.booleanDesc;
  }
}
