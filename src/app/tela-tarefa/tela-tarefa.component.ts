import axios from 'axios';
import { PrimeIcons } from 'primeng/api';
import { Project } from 'src/model/project';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Status } from 'src/model/status';

interface OptionOrder {
  name: string;
  type: string;

}

@Component({
  selector: 'app-tela-tarefa',
  templateUrl: './tela-tarefa.component.html',
  styleUrls: ['./tela-tarefa.component.scss'],
  //
})
export class TelaTarefaComponent implements OnInit {
  selectedVisualizacao = 'Visualização';
  select: string = 'Padrao';
  listaTarefas: Array<Task> = [];
  booleanTask: boolean = false;

  tarefaSelecionada: Task = new Task();
  tarefaNova: Task = new Task();
  listaNova: Array<Task> = [];
  tarefaMovida!: any;

  listOptions: Array<any> = [];
  listIcons: Array<string> = [];
  visualizacaoVisible: boolean = false;
  ordenacaoVisible: boolean = false;
  filtroVisible: boolean = false;
  projeto!: Project;

  option: string | null = 'Cards';
  optionFilter: string = '';

  constructor(private service: BackendEVOLVEService) {}

  async atualizar(favoritado: boolean): Promise<void> {
    if (favoritado) {
      console.log(this.listaTarefas);
      this.projeto = await this.service.getOne('project', 1);
      this.listaTarefas = this.projeto.tasks;
      this.sortLists();
    }
  }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('taskViewPreference') != null) {
      this.option = localStorage.getItem('taskViewPreference');
    }

    this.projeto = await this.service.getOne('project', 1);
    this.listaTarefas = this.projeto.tasks;
    this.listaNova = this.projeto.tasks;
    this.sortLists();
    console.log(this.listaTarefas);
    console.log(this.projeto);
  }
  sortLists() {
    this.listaTarefas.sort(this.opa);
    this.listaNova.sort(this.opa);
  }

  opa = (a:Task, b:Task) => {
    return a.favorited === b.favorited ? 0 : a.favorited ? -1 : 1;
  }

  trackById(index: number, item: any): any {
    return item.id;
  }
  changeVisualizacao(e: any) {
    this.ordenacaoVisible = false;
    this.filtroVisible = false;

    e.target.value = 'Visualização'; 
    let op : OptionOrder ={
      name: "Cards",
      type: " "
     }
     let op1 : OptionOrder ={
      name: "Kanban",
      type: ""
     }
     let op2 : OptionOrder ={
      name: "Lista",
      type: ""
     }
     let op3 : OptionOrder ={
      name: "Calendario",
      type: ""
     }
    

     this.listOptions = [op, op1, op2, op3];
    this.listIcons = [
      PrimeIcons.TH_LARGE,
      PrimeIcons.MAP,
      PrimeIcons.BARS,
      PrimeIcons.CALENDAR,
    ];
    if (this.visualizacaoVisible == true) {
      this.visualizacaoVisible = false;
    } else {
      this.visualizacaoVisible = true;
    }
  }

  async optionA(option: any) {
    this.visualizacaoVisible = false;

    this.option = option.name;
    console.log(option);
    localStorage.setItem('taskViewPreference', option.name);

    this.projeto = await this.service.getOne('project', this.projeto.id);
    this.listaTarefas = this.projeto.tasks;
    this.sortLists();
  }

  changeOrdenacao(e: any) {
    this.visualizacaoVisible = false;
    this.filtroVisible = false;

   

    console.log(this.ordenacaoVisible);
    e.target.value = 'Visualização';

   
   let op : OptionOrder ={
    name: "Data final",
    type: "date"
   }
   let op1 : OptionOrder ={
    name: "Progresso",
    type: "number"
   }
   let op2 : OptionOrder ={
    name: "Prioridade",
    type: "priority"
   }
   let op3 : OptionOrder ={
    name: "Data final",
    type: "date"
   }
   this.listOptions = [op, op1, op2, op3];
    this.listIcons = [
      PrimeIcons.CALENDAR,
      PrimeIcons.CHART_LINE,
      PrimeIcons.EXCLAMATION_CIRCLE,
      PrimeIcons.CALENDAR_TIMES,
    ];
    if (this.ordenacaoVisible == true) {
      this.ordenacaoVisible = false;
    } else {
      this.ordenacaoVisible = true;
    }
    console.log(this.ordenacaoVisible);
  }

  closeTask(event: boolean) {
    console.log('ta entrando no close task');
    if (event) {
      this.tarefaNova = new Task();
      this.booleanTask = false;
    }
  }

  optionB(option: any) {
    this.ordenacaoVisible = false;
    this.visualizacaoVisible = false;

    console.log(option);
    console.log(this.listOptions);
    if(option.type=="date"){
      if(option.name=="Data final"){
        console.log("wgdg");
        
        this.listaTarefas.sort((a,b)=>{
          if (a.finalDate < b.finalDate) {
            return -1; // 'a' vem antes de 'b'
          } else if (a.finalDate > b.finalDate) {
            return 1; // 'b' vem antes de 'a'
          } else {
            return 0; // datas são iguais
          }
        })
        this.listaNova.sort((a,b)=>{
          if (a.finalDate < b.finalDate) {
            return -1; // 'a' vem antes de 'b'
          } else if (a.finalDate > b.finalDate) {
            return 1; // 'b' vem antes de 'a'
          } else {
            return 0; // datas são iguais
          }
        })
      }
      console.log(this.listaNova);
      console.log(this.listaTarefas);

      
      }
      }
      
  
  changeFiltro(e: any) {
    this.visualizacaoVisible = false;
    this.ordenacaoVisible = false;

    
    let op : OptionOrder ={
      name: "Status",
      type: "status"
     }
     let op1 : OptionOrder ={
      name: "Associado",
      type: "associate"
     }
     let op2 : OptionOrder ={
      name: "Prioridade",
      type: "priority"
     }
     let op3 : OptionOrder ={
      name: "Favorito",
      type: "favorited"
     }
     this.listOptions = [op, op1, op2, op3];
        this.listIcons = [
      PrimeIcons.SPINNER,
      PrimeIcons.USER,
      PrimeIcons.EXCLAMATION_CIRCLE,
      PrimeIcons.STAR,
    ];
    if (this.filtroVisible == true) {
      this.filtroVisible = false;
    } else {
      this.filtroVisible = true;
    }
    console.log(this.filtroVisible);
  }

  async optionC(option: any) {
    if (option.name== 'Status') {
      this.optionFilter = '';
      
      
    } else {
      this.optionFilter = option.name;
      console.log(this.optionFilter);
      
      this.optionFilter = this.optionFilter.toLowerCase();
    }
    this.ordenacaoVisible = false;
    this.visualizacaoVisible = false;

    this.projeto.statusList.map((status: Status) => {
      if (status.name == option.name) {
        this.listaTarefas = this.listaNova.filter((task)=> task.currentStatus.name==option.name)
      this.filtroVisible = false;
      }

     
      this.sortLists();
    });

    if (option.name == 'Favorito') {
      console.log(this.listaNova);

      this.listaTarefas = this.listaNova.filter((task)=> task.favorited )
      
      this.filtroVisible = false;
      this.sortLists();
    
    
    }
  }

  openTask(tarefa: Task): void {
    this.tarefaSelecionada = tarefa;
    this.booleanTask = !this.booleanTask;
    console.log(this.booleanTask);
    console.log('ta vindo');
    this.tarefaSelecionada = tarefa;
  }

  openTaskEdit(tarefa: Task) {
    this.tarefaSelecionada = this.tarefaNova;
    this.booleanTask = true;
  }

  adicionarTarefa() {
    this.tarefaSelecionada.id = 0;
    this.booleanTask = !this.booleanTask;
  }
  async removeFilter() {
    console.log('pobbbb');
    this.optionFilter = '';
console.log(this.listaNova);

    this.listaTarefas = this.listaNova;
    this.sortLists();
  }

  // filtrarLista(status:Status): Array<Task> {
  //   let listaFiltrada = this.listaTarefas.filter(
  //     (tarefa: Task) => tarefa.currentStatus.name === status.name
  //   );
  //   return listaFiltrada
  // }
}
