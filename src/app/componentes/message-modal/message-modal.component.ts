import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
@Input()
title =  ''
@Input()
message =  ''
@Output()
modal = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  cancelar(){
    this.modal.emit(false);

  }
  confirmar(){
    this.modal.emit(true);
  }


}
