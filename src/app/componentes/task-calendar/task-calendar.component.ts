import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';


@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.scss']
})
export class TaskCalendarComponent implements OnInit, OnChanges{

  constructor(private service : BackendEVOLVEService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskList']) {
      // Call your function here, now that inputData has been received
      this.teste()
    }  }

  @Input() taskList!: Array<Task>;
  @Input() project!: Project;
  openDaytasks: boolean = false;

  dataAtual: Date = new Date();
  diasCalendario: Date[] = [];
  dayOpen = new Date;

  ngOnInit() {
    this.construirCalendario();
    this.dayOpen.setHours(0, 0, 0, 0)


    
  }

  construirCalendario() {
    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDiaDaSemana = 1; // domingo
    const ultimoDiaDaSemana = 0;   // sábado

    // Vai subtraindo -1 até chegarmos no primeiro dia da semana
    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

    // Vai somando +1 até chegarmos no último dia da semana
    const dataFinal = new Date(ano, mes + 1, 0);
    while (dataFinal.getDay() !== ultimoDiaDaSemana) {
      dataFinal.setDate(dataFinal.getDate() + 1);
    }

    this.diasCalendario = [];
    for (
      let data = new Date(dataInicial.getTime());
      data <= dataFinal;
      data.setDate(data.getDate() + 1)
    ) {
      this.diasCalendario.push(new Date(data.getTime()));
    }
  }

  alterarMes(offsetMes: number) {
      this.dataAtual.setMonth(this.dataAtual.getMonth() + offsetMes);
      this.dataAtual = new Date(this.dataAtual.getTime());
      this.construirCalendario();
  }
  teste(){
    console.log(this.taskList)
    for(let task of this.taskList){
      if(task.finalDate!=null){
     
        task.finalDate=new Date(task.finalDate+"T00:00:00-03:00")
        task.project = {
          id:this.project.id
        }
        console.log(task)
        this.service.putTarefa(task);
      
        this.diasCalendario.map(dia =>{
        
        
        
          if(dia.getTime()==task.finalDate.getTime()){
            console.log("dsdas");
          }
           
        })
      }
    }
  }
  openSideDayTasks(dia : Date){
    this.openDaytasks=!this.openDaytasks
    this.dayOpen=dia;
  }
  isToday(dia : Date){
    const today = new Date()
    today.setHours(0, 0, 0, 0)
   
   
   
    
    return dia.getTime()==today.getTime()
  }
  
}
