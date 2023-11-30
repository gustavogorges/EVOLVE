import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { Status } from 'src/model/status';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss']
})
export class SelectCustomComponent implements OnInit {
  
  @Input()
  listOptions : Array<string> = new Array

  

  @Output() newItem = new EventEmitter<string>();


  constructor(
   
  ) { }

  ngOnInit(): void {
    console.log(this.listOptions)
    
  }

  saveOption(option:string) {
    this.newItem.emit(option);
    console.log(option)
  }

  
}
