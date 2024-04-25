
import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';


@Component({
  selector: 'app-entrega-prox',
  templateUrl: './entrega-prox.component.html',
  styleUrls: ['./entrega-prox.component.scss']
})
export class EntregaProxComponent implements OnInit {

  

  @Input() tarefa: Task = new Task
  @Input() favoritedAble: boolean = true
  defaultColor = "#F5B1B1"
  constructor(private service: BackendEVOLVEService,
    private cookies_service:CookiesService) { }

    loggedUser : User = new User;
    arrayForce : Array<User> = new Array;

  async ngOnInit() {
    //retirar quando fizer o calculo automatico
    this.tarefa.conclusionPercentage = 75
    this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user})
    this.arrayForce =  this.tarefa.associates as Array<User> 

  }

  alterarTarefaFavoritado(){
    this.tarefa.favorited = !this.tarefa.favorited;
    this.salvarTarefa()
  }

  salvarTarefa(){
    this.service.putTarefa(this.tarefa, this.loggedUser.id);
  }
  getUserStyles(user: any): any {
    let styles: any = {};
 
    if(user.image!=null){
      styles['background'] = user.imageColor;
    }
    styles['background-color'] = user.imageColor;
      
    
    return styles;
  }

}
