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
  lang = ''
  ordemPrioridades = ['URGENTE', 'ALTA', 'MEDIA', 'BAIXA', 'MUITO_BAIXA', 'NENHUMA'];


  @Output() newItem = new EventEmitter<string>();


  constructor(private service: BackendEVOLVEService
  ) { }

  async ngOnInit(): Promise<void> {
    this.projeto = await this.service.getOne("project", this.projeto.id)
    this.lang = localStorage.getItem('lang') || 'en'
  }

  saveOption(option: any) {
    this.listOptions = []
    this.listIcons = []

    this.newItem.emit(option);
    if (option.name == "Status" || option.name == "Estado" || option.name == "状态") {
      this.projeto.statusList.map((status: Status) => {
        this.listOptions.push(status)
      })



    }

    if (option.name == "Associado" || option.name == 'Associate' || option.name == '关联' || option.name == 'Asociado') {
      this.projeto.members.map(userProject => {
        this.listOptions.push(userProject.user)
      })
    }

    if (option.name == "Prioridade" || option.name == "Priority" || option.name == "优先级" || option.name == "Prioridad") {
      this.ordemPrioridades.map((s) => {
        this.listOptions.push(s)
      })



    }

  }




}
