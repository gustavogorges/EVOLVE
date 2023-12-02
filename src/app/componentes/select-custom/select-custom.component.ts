import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
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
  @Input()
  listIcons : Array<string>=new Array
  projeto !: Projeto 

  

  @Output() newItem = new EventEmitter<string>();


  constructor(private service : BackendEVOLVEService 
  ) { }

  ngOnInit(): void {
    console.log(this.listOptions)
    console.log(this.listIcons)
    
  }

  saveOption(option:string) {
    this.newItem.emit(option);
    console.log(option)
    if(option=="Status"){
      async () => {
       this.projeto = await this.service.getOne("projeto",2153)
       
      }
      console.log(this.projeto)

     }

  }



  
}
