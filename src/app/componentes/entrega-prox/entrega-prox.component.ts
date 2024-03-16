
import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { User } from 'src/model/user';


@Component({
  selector: 'app-entrega-prox',
  templateUrl: './entrega-prox.component.html',
  styleUrls: ['./entrega-prox.component.scss']
})
export class EntregaProxComponent implements OnInit {

  

  @Input() tarefa: Task = new Task
  @Input() withProgressBar!: boolean 
  defaultColor = "#F5B1B1"
  constructor(private service: BackendEVOLVEService) { }

  ngOnInit(): void {
    //retirar quando fizer o calculo automatico
    this.tarefa.conclusionPercentage = 75
  }

  alterarTarefaFavoritado(){
    this.tarefa.favorited = !this.tarefa.favorited;
    this.salvarTarefa()
  }

  salvarTarefa(){
    this.service.putTarefa(this.tarefa);
  }
  getUserStyles(user: any): any {
    let styles: any = {};
    styles['background-color'] = user.imageColor;
      
    
    return styles;
  }

}
