import axios from 'axios';
import { PrimeIcons } from 'primeng/api';
import { Project } from 'src/model/project';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
;
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Status } from 'src/model/status';
import { PriorityRecord } from 'src/model/PriorityRecord'; 
import { User } from 'src/model/user';
import { ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
 import html2canvas from 'html2canvas';
 import { HttpClient } from '@angular/common/http';
import { CookiesService } from 'src/service/cookies-service.service';

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
  loggedUser : User = new User();

ordemPrioridades = ['URGENTE', 'ALTA', 'MEDIA', 'BAIXA', 'MUITO_BAIXA', 'NENHUMA'];
  option: string | null = 'Cards';
  optionFilter: string = '';

  constructor(private service: BackendEVOLVEService, private route: ActivatedRoute, private cookies_service : CookiesService
 ) {}

  async atualizar(favoritado: boolean): Promise<void> { 
    if (favoritado) {
      this.projeto = await this.service.getOne('project', this.projeto.id);
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
    this.route.paramMap.subscribe( async params  => {
      // Obtém o parâmetro do projeto da rota
      const projectId = params.get('projectId');
      const id  = Number(projectId)
      this.projeto = await this.service.getOne('project', id);
      console.log(this.projeto);
      this.teste()
    });
  
    this.loggedUser = await this.cookies_service.getLoggedUser();
   
    this.listaTarefas.forEach(element => {
      this.translateStatus(element)
    });
  }

  translateStatus(tarefa:Task) {
    const lang = localStorage.getItem('lang');
    if (lang === 'ch') {
            if (tarefa.currentStatus.name === 'pendente' || tarefa.currentStatus.name === 'pendiente' || tarefa.currentStatus.name === 'pending') {
                tarefa.currentStatus.name = '待定';
            } else if (tarefa.currentStatus.name === 'em progresso' || tarefa.currentStatus.name === 'en progreso' || tarefa.currentStatus.name === 'in progress') {
                tarefa.currentStatus.name = '进展中';
            } else if (tarefa.currentStatus.name === 'concluido' || tarefa.currentStatus.name === 'completado' || tarefa.currentStatus.name === 'completed') {
                tarefa.currentStatus.name = '已完成';
            } else if (tarefa.currentStatus.name === 'não atribuido' || tarefa.currentStatus.name === 'Sin asignar' || tarefa.currentStatus.name === 'Unassigned') {
                tarefa.currentStatus.name = '未分配';
            }
    } else if (lang === 'pt') {
            if (tarefa.currentStatus.name === '待定' || tarefa.currentStatus.name === 'pendiente' || tarefa.currentStatus.name === 'pending') {
                tarefa.currentStatus.name = 'pendente';
            } else if (tarefa.currentStatus.name === '进展中' || tarefa.currentStatus.name === 'en progreso' || tarefa.currentStatus.name === 'in progress') {
                tarefa.currentStatus.name = 'em progresso';
            } else if (tarefa.currentStatus.name === '已完成' || tarefa.currentStatus.name === 'completado' || tarefa.currentStatus.name === 'completed') {
                tarefa.currentStatus.name = 'concluido';
            } else if (tarefa.currentStatus.name === '未分配' || tarefa.currentStatus.name === 'Sin asignar' || tarefa.currentStatus.name === 'Unassigned') {
                tarefa.currentStatus.name = 'não atribuido';
            }
    } else if (lang === 'es') {
            if (tarefa.currentStatus.name === '待定' || tarefa.currentStatus.name === 'pendente' || tarefa.currentStatus.name === 'pending') {
                tarefa.currentStatus.name = 'pendiente';
            } else if (tarefa.currentStatus.name === '进展中' || tarefa.currentStatus.name === 'em progresso' || tarefa.currentStatus.name === 'in progress') {
                tarefa.currentStatus.name = 'en progreso';
            } else if (tarefa.currentStatus.name === '已完成' || tarefa.currentStatus.name === 'concluido' || tarefa.currentStatus.name === 'completed') {
                tarefa.currentStatus.name = 'completado';
            } else if (tarefa.currentStatus.name === '未分配' || tarefa.currentStatus.name === 'não atribuido' || tarefa.currentStatus.name === 'Unassigned') {
                tarefa.currentStatus.name = 'Sin asignar';
            }
    } else if (lang === 'en') {
            if (tarefa.currentStatus.name === '待定' || tarefa.currentStatus.name === 'pendente' || tarefa.currentStatus.name === 'pendiente') {
                tarefa.currentStatus.name = 'pending';
            } else if (tarefa.currentStatus.name === '进展中' || tarefa.currentStatus.name === 'em progresso' || tarefa.currentStatus.name === 'en progreso') {
                tarefa.currentStatus.name = 'in progress';
            } else if (tarefa.currentStatus.name === '已完成' || tarefa.currentStatus.name === 'concluido' || tarefa.currentStatus.name === 'completado') {
                tarefa.currentStatus.name = 'completed';
            } else if (tarefa.currentStatus.name === '未分配' || tarefa.currentStatus.name === 'não atribuido' || tarefa.currentStatus.name === 'Sin asignar') {
                tarefa.currentStatus.name = 'Unassigned';
            }
    }
}
 
  teste(){
    console.log(this.projeto);
    
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

    e.target.value = 'Visualização';
    const lang = localStorage.getItem('lang');

    let op: OptionOrder;
    let op1: OptionOrder;
    let op2: OptionOrder;
    let op3: OptionOrder;
    
    if (lang === 'pt') {
        op = {
            name: 'Data final',
            type: 'date'
        };
        op1 = {
            name: 'Progresso',
            type: 'number'
        };
        op2 = {
            name: 'Prioridade',
            type: 'priority'
        };
        op3 = {
            name: 'Agendamento',
            type: 'date'
        };
    } else if (lang === 'es') {
        op = {
            name: 'Fecha final',
            type: 'date'
        };
        op1 = {
            name: 'Progreso',
            type: 'number'
        };
        op2 = {
            name: 'Prioridad',
            type: 'priority'
        };
        op3 = {
            name: 'Programación',
            type: 'date'
        };
    } else if (lang === 'ch') {
        op = {
            name: '最终日期',
            type: 'date'
        };
        op1 = {
            name: '进度',
            type: 'number'
        };
        op2 = {
            name: '优先级',
            type: 'priority'
        };
        op3 = {
            name: '日程安排',
            type: 'date'
        };
    } else {
        op = {
            name: 'Due Date',
            type: 'date'
        };
        op1 = {
            name: 'Progress',
            type: 'number'
        };
        op2 = {
            name: 'Priority',
            type: 'priority'
        };
        op3 = {
            name: 'Schedule',
            type: 'date'
        };
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
  }

 async closeTask(event: boolean) {
    if (event) {
      this.tarefaNova = new Task();
      this.booleanTask = false;
      this.projeto = await this.service.getOne('project', this.projeto.id);
      this.listaTarefas = this.projeto.tasks;    }
  }

  optionB(option: any) {
    this.ordenacaoVisible = false;
    this.visualizacaoVisible = false;

    if (option.type == "date") {
      if (option.name == "Data final" || option.name == 'Due Date' || option.name == 'Fecha final'
      || option.name == '最终日期'
      ) {
        this.sortByDate(this.listaTarefas, 'finalDate');
        this.sortByDate(this.listaNova, 'finalDate');
      }
      if (option.name == "Agendamento" || option.name == "Schedule" || option.name == "日程安排" || option.name == "Programación") {
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
    
    const lang = localStorage.getItem('lang');

// Define os objetos de opção com os nomes traduzidos de acordo com o idioma
let op: OptionOrder;
let op1: OptionOrder;
let op2: OptionOrder;
let op3: OptionOrder;

if (lang === 'pt') {
    op = {
        name: 'Status',
        type: 'status'
    };
    op1 = {
        name: 'Associado',
        type: 'associate'
    };
    op2 = {
        name: 'Prioridade',
        type: 'priority'
    };
    op3 = {
        name: 'Favorito',
        type: 'favorited'
    };
} else if (lang === 'es') {
    op = {
        name: 'Estado',
        type: 'status'
    };
    op1 = {
        name: 'Asociado',
        type: 'associate'
    };
    op2 = {
        name: 'Prioridad',
        type: 'priority'
    };
    op3 = {
        name: 'Favorito',
        type: 'favorited'
    };
} else if (lang === 'ch') {
    op = {
        name: '状态',
        type: 'status'
    };
    op1 = {
        name: '关联',
        type: 'associate'
    };
    op2 = {
        name: '优先级',
        type: 'priority'
    };
    op3 = {
        name: '收藏',
        type: 'favorited'
    };
} else {
    op = {
        name: 'Status',
        type: 'status'
    };
    op1 = {
        name: 'Associate',
        type: 'associate'
    };
    op2 = {
        name: 'Priority',
        type: 'priority'
    };
    op3 = {
        name: 'Favorite',
        type: 'favorited'
    };
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

    }  }

  async optionC(option: any) {
    console.log(option);
    
    if (option.name== 'Status' || option.name== 'Prioridade' || option.name== 'Associado' || option.name== '状态' 
    || option.name== 'Estado' || option.name== 'Prioridad' || option.name== 'Priority' || option.name== '优先级'
    || option.name== 'Associate' || option.name== '关联' || option.name== 'Asociado') {
      this.optionFilter = '';
      console.log(3);
      
    } 
    else {      
      this.optionFilter = option.name ?? option;
      this.optionFilter = this.optionFilter.toLowerCase();
    }
    this.ordenacaoVisible = false;
    this.visualizacaoVisible = false;

    this.projeto.statusList.map((status: Status) => {
      if (status.name == option.name) {

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
          console.log(option);
          
          if (s.user.name == option.name) {
            console.log(option.name);

            this.listaTarefas = this.listaNova.filter((task) => task.associates.find(associate => ((associate as User).name) == option.name));
          this.filtroVisible = false;
          }
  
      this.sortLists();
    });

    if (option.name == 'Favorito' || option.name == 'Favorite' || option.name == '收藏') {

      this.listaTarefas = this.listaNova.filter((task)=> task.favorited )
      this.filtroVisible = false;
      this.sortLists()
    }
  }

  
  openTask(tarefa: Task): void {
    this.tarefaSelecionada = tarefa;
    this.booleanTask = true;
    this.tarefaSelecionada = tarefa;
  }


  async openTaskEdit(tarefa:Task) {
    let priorityTeste : PriorityRecord = new PriorityRecord();
    priorityTeste.name = "NENHUMA";
    priorityTeste.backgroundColor = "#cccccc" 
    this.tarefaNova.creator = this.loggedUser;
    this.tarefaNova.project = this.projeto;
    console.log(this.tarefaNova.project.team);
    this.tarefaNova.currentStatus = this.projeto.statusList[0];

    console.log(this.tarefaNova);
    this.tarefaNova = await this.service.postTarefa(this.tarefaNova,this.projeto.id);
    console.log(this.tarefaNova);

    this.tarefaNova.priority = priorityTeste; 
    this.tarefaSelecionada = this.tarefaNova;
    console.log(this.tarefaSelecionada);
    
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
