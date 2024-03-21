import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss']
})
export class SelectCustomComponent implements OnInit {
  
  @Input()
  listOptions !: Array<any> 
  @Input()
  listIcons !: Array<string>
  @Input()
  projeto !: Project 

  

  @Output() newItem = new EventEmitter<any>();


  constructor(private service : BackendEVOLVEService 
  ) { }

  async ngOnInit(): Promise<void> {
    console.log(this.listOptions)
    console.log(this.listIcons)

    this.projeto = await this.service.getOne("project",this.projeto.id)


    
  }

  saveOption(option:any) {
    this.listOptions=[]
    this.listIcons=[]

    this.newItem.emit(option);
    console.log(option)
    if(option.name=="Status"){
      this.projeto.statusList.map((status :Status)=>{
        console.log(status.name)
        this.listOptions.push(status)
       })
  
      

     }
    
  }



  
}
