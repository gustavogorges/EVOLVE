import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/model/project';
import { Status } from 'src/model/status';
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

  ordemPrioridades = ['URGENTE', 'ALTA', 'MEDIA', 'BAIXA', 'MUITO_BAIXA', 'NENHUMA'];


  @Output() newItem = new EventEmitter<any>();


  constructor(private service : BackendEVOLVEService 
  ) { }

  async ngOnInit(): Promise<void> {
    this.projeto = await this.service.getOne("project",this.projeto.id)
  }

  saveOption(option:any) {
    this.listOptions=[]
    this.listIcons=[]

    this.newItem.emit(option);
    if(option.name=="Status"){
      this.projeto.statusList.map((status :Status)=>{
        this.listOptions.push(status)
       })
  
      

     }
     if(option.name=="Associado"){
      this.projeto.members.map(userProject => {
        this.listOptions.push(userProject.user)
       })
  
      

     }
     if(option.name=="Prioridade"){
      this.ordemPrioridades.map((s)=>{
        console.log(s)
        this.listOptions.push(s)
        console.log(this.listOptions);
        
       })
  
      

     }
    
  }



  
}
