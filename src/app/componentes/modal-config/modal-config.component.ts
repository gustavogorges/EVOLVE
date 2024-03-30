import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss']
})
export class ModalConfigComponent implements OnInit {

  constructor() { }
  @Output() close = new EventEmitter<boolean>();

  ngOnInit(): void {
  }
  closeModal(){
    this.close.emit(false)
  }

}
