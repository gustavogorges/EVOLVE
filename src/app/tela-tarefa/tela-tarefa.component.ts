import axios from 'axios';
import { PrimeIcons } from 'primeng/api';
import { Project } from 'src/model/project';
import {
  Component,
  OnInit,
} from '@angular/core';
;
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Status } from 'src/model/status';
import { PriorityRecord } from 'src/model/priorityRecord';
import { User } from 'src/model/user';

interface OptionOrder {
  name: string;
  type: string;
}
@Component({
  selector: 'app-tela-tarefa',
  templateUrl: './tela-tarefa.component.html',
  styleUrls: ['./tela-tarefa.component.scss'],
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
<<<<<<< HEAD

=======
ordemPrioridades = ['URGENTE', 'ALTA', 'MEDIA', 'BAIXA', 'MUITO_BAIXA', 'NENHUMA'];
>>>>>>> c87ee9cb660e44b2c4f8c14839cf1af1d10fe4b9
  option: string | null = 'Cards';
  optionFilter: string = '';

  constructor(private service: BackendEVOLVEService) {}

  async atualizar(favoritado: boolean): Promise<void> {
    if (favoritado) {
      this.projeto = await this.service.getOne('project', 1);
      this.listaTarefas = this.projeto.tasks;
      this.listaNova = this.projeto.tasks;
      this.sortLists();
      console.log(this.listaTarefas);

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
  }
  sortLists() {
    this.listaTarefas.sort(this.opa);
    this.listaNova.sort(this.opa);
  }

  opa = (a: Task, b: Task) => {
    return a.favorited === b.favorited ? 0 : a.favorited ? -1 : 1;
  };

  trackById(index: number, item: any): any {
    return item.id;
  }
  changeVisualizacao(e: any) {
    this.ordenacaoVisible = false;
    this.filtroVisible = false;

    e.target.value = 'Visualização';
    let op: OptionOrder = {
      name: 'Cards',
      type: ' ',
    };
    let op1: OptionOrder = {
      name: 'Kanban',
      type: '',
    };
    let op2: OptionOrder = {
      name: 'Lista',
      type: '',
    };
    let op3: OptionOrder = {
      name: 'Calendario',
      type: '',
    };

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
    localStorage.setItem('taskViewPreference', option.name);

    this.projeto = await this.service.getOne('project', this.projeto.id);
    this.listaTarefas = this.projeto.tasks;
    this.sortLists();
  }

  changeOrdenacao(e: any) {
    this.visualizacaoVisible = false;
    this.filtroVisible = false;
<<<<<<< HEAD

    e.target.value = 'Visualização';

    let op: OptionOrder = {
      name: 'Data final',
      type: 'date',
    };
    let op1: OptionOrder = {
      name: 'Progresso',
      type: 'number',
    };
    let op2: OptionOrder = {
      name: 'Prioridade',
      type: 'priority',
    };
    let op3: OptionOrder = {
      name: 'Data final',
      type: 'date',
    };
    this.listOptions = [op, op1, op2, op3];
=======
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
    name: "Agendamento",
    type: "date"
   }
   this.listOptions = [op, op1, op2, op3];
>>>>>>> c87ee9cb660e44b2c4f8c14839cf1af1d10fe4b9
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
  }

  closeTask(event: boolean) {
    if (event) {
      this.tarefaNova = new Task();
      this.booleanTask = false;
    }
  }

  optionB(option: any) {
    this.ordenacaoVisible = false;
    this.visualizacaoVisible = false;
<<<<<<< HEAD

    if (option.type == 'date') {
      if (option.name == 'Data final') {

        this.listaTarefas.sort((a, b) => {
          if (a.finalDate < b.finalDate) {
            return -1; // 'a' vem antes de 'b'
          } else if (a.finalDate > b.finalDate) {
            return 1; // 'b' vem antes de 'a'
          } else {
            return 0; // datas são iguais
          }
        });
        this.listaNova.sort((a, b) => {
          if (a.finalDate < b.finalDate) {
            return -1; // 'a' vem antes de 'b'
          } else if (a.finalDate > b.finalDate) {
            return 1; // 'b' vem antes de 'a'
          } else {
            return 0; // datas são iguais
          }
        });
      }
    }
  }

  changeFiltro(e: any) {
    this.visualizacaoVisible = false;
    this.ordenacaoVisible = false;

    let op: OptionOrder = {
      name: 'Status',
      type: 'status',
    };
    let op1: OptionOrder = {
      name: 'Associado',
      type: 'associate',
    };
    let op2: OptionOrder = {
      name: 'Prioridade',
      type: 'priority',
    };
    let op3: OptionOrder = {
      name: 'Favorito',
      type: 'favorited',
    };
    this.listOptions = [op, op1, op2, op3];
    this.listIcons = [
=======
    if (option.type == "date") {
      if (option.name == "Data final") {
        this.sortByDate(this.listaTarefas, 'finalDate');
        this.sortByDate(this.listaNova, 'finalDate');
      }
      if (option.name == "Agendamento") {
        this.sortByDate(this.listaTarefas, 'scheduledDate');
        this.sortByDate(this.listaNova, 'scheduledDate');
      }
      }
      if(option.type == "number"){
        this.sortByDate(this.listaTarefas, "progress")
        this.sortByDate(this.listaNova, "progress")

      }
      if (option.type == "priority") {
        this.listaTarefas.forEach((t) => {
          switch (t.priority.name) {
            case "urgente":
              t.priority.value = 100;
              break;
            case "alta":
              t.priority.value = 80;
              break;
            case "media":
              t.priority.value = 60;
              break;
            case "baixa":
              t.priority.value = 40;
              break;
            case "muito_baixa":
              t.priority.value = 20;
              break;
            case "nenhuma":
              t.priority.value = 0;
              break;
          }
        });
      
        this.sortByPriority(this.listaTarefas);
        this.sortByPriority(this.listaNova);        
      }
    }
      
      // Função para obter o índice de uma prioridade na ordem definida
      indicePrioridade(prioridade: string): number {
        const indice = this.ordemPrioridades.indexOf(prioridade);
        // Se a prioridade não estiver na lista, atribua um índice muito alto para classificá-la no final
        return indice !== -1 ? indice : Number.MAX_SAFE_INTEGER;
      }
      
      // Função de comparação personalizada
      compararPrioridades(a: any, b: any): number {
        const indiceA = this.indicePrioridade(a.priority.name);
        const indiceB = this.indicePrioridade(b.priority.name);      
        return indiceA - indiceB;
      }
      // Função para classificar por prioridade
      sortByPriority(tarefas: any[]) {
        tarefas.sort(this.compararPrioridades.bind(this));
      }
       sortByDate(lista: any[], key: string) {
        lista.sort((a, b) => {
          if (a[key] < b[key]) {
            return -1;
          } else if (a[key] > b[key]) {
            return 1;
          } else {
            return 0;
          }
        });        
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
>>>>>>> c87ee9cb660e44b2c4f8c14839cf1af1d10fe4b9
      PrimeIcons.SPINNER,
      PrimeIcons.USER,
      PrimeIcons.EXCLAMATION_CIRCLE,
      PrimeIcons.STAR,
    ];
    if (this.filtroVisible == true) {
      this.filtroVisible = false;
    } else {
      this.filtroVisible = true;
<<<<<<< HEAD
    }
  }

  async optionC(option: any) {
    if (option.name == 'Status') {
      this.optionFilter = '';
    } else {
      this.optionFilter = option.name;

=======
    }  }

  async optionC(option: any) {
    if (option.name== 'Status' || option.name== 'Prioridade' || option.name== 'Associado' ) {
      this.optionFilter = '';
    } 
    else {      
      this.optionFilter = option.name ?? option;
>>>>>>> c87ee9cb660e44b2c4f8c14839cf1af1d10fe4b9
      this.optionFilter = this.optionFilter.toLowerCase();
    }
    this.ordenacaoVisible = false;
    this.visualizacaoVisible = false;

    this.projeto.statusList.map((status: Status) => {
      if (status.name == option.name) {
<<<<<<< HEAD
        this.listaTarefas = this.listaNova.filter(
          (task) => task.currentStatus.name == option.name
        );
        this.filtroVisible = false;
      }

=======
        this.listaTarefas = this.listaNova.filter((task)=> task.currentStatus.name==option.name)
      this.filtroVisible = false;
      } });
      this.ordemPrioridades.map((s) => {
        if (s == option) {
          this.listaTarefas = this.listaNova.filter((task)=> task.priority.name==option)
        this.filtroVisible = false;
        }
      });
        this.projeto.members.map((s) => {
          
          if (s.name == option.name) {
            console.log(option.name);

            this.listaTarefas = this.listaNova.filter((task) => task.associates.find(associate => ((associate as User).name) == option.name));
          this.filtroVisible = false;
          }
          
    
     
>>>>>>> c87ee9cb660e44b2c4f8c14839cf1af1d10fe4b9
      this.sortLists();
    });

    if (option.name == 'Favorito') {
<<<<<<< HEAD
      this.listaTarefas = this.listaNova.filter((task) => task.favorited);

      this.filtroVisible = false;
      this.sortLists();
=======
      this.listaTarefas = this.listaNova.filter((task)=> task.favorited )
      this.filtroVisible = false;
      this.sortLists()
>>>>>>> c87ee9cb660e44b2c4f8c14839cf1af1d10fe4b9
    }
  }

  
  openTask(tarefa: Task): void {
    this.tarefaSelecionada = tarefa;
    this.booleanTask = !this.booleanTask;
    this.tarefaSelecionada = tarefa;
  }

<<<<<<< HEAD
  openTaskEdit(tarefa: Task) {
    let priorityTeste: PriorityRecord = new PriorityRecord();
    priorityTeste.name = 'nenhuma';
    priorityTeste.backgroundColor = '#cccccc';
    this.tarefaNova.priority = priorityTeste;
=======
  openTaskEdit(tarefa:Task) {
    let priorityTeste : PriorityRecord = new PriorityRecord();
    priorityTeste.name = "nenhuma";
    priorityTeste.backgroundColor = "#cccccc" 
    this.tarefaNova.priority = priorityTeste; 
>>>>>>> c87ee9cb660e44b2c4f8c14839cf1af1d10fe4b9
    this.tarefaSelecionada = this.tarefaNova;
    this.booleanTask = true;
  }

  adicionarTarefa() {
    this.tarefaSelecionada.id = 0;
    this.booleanTask = !this.booleanTask;
  }
  async removeFilter() {
    this.optionFilter = '';

    this.listaTarefas = this.listaNova;
    this.sortLists();
  }


}
