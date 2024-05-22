import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, SimpleChanges,ViewChild, ViewChildren } from '@angular/core';
import { Logger } from 'html2canvas/dist/types/core/logger';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss']
})
export class WeekCalendarComponent implements OnInit{

  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;




  constructor(private service: BackendEVOLVEService,private cookieService:CookiesService, private elRef: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskList']) {
    }
  }

  taskList: Array<Task> = [];
  // @Input() project!: Project;

  semanaAtual: Date[] = [];
  diasSemana: Date[] = [];
  looggedUser!:User

  async ngOnInit() {
    this.looggedUser = await this.cookieService.getLoggedUser();
    this.taskList = await this.service.getTasksByUserId(this.looggedUser.id);
    this.atualizarSemana();
  }

  atualizarSemana() {
    this.semanaAtual = this.getWeek(new Date());
    this.construirDiasSemana();
  }

  alterarSemana(offsetSemana: number) {
    const novaData = new Date(this.semanaAtual[0]);
    novaData.setDate(novaData.getDate() + (offsetSemana * 7));
    this.semanaAtual = this.getWeek(novaData);
    this.construirDiasSemana();
  }

  getWeek(date: Date): Date[] {
    const dayOfWeek = date.getDay();
    const firstDay = new Date(date);
    const lastDay = new Date(date);

    // Se for domingo, ajuste para segunda-feira
    if (dayOfWeek === 0) {
      firstDay.setDate(date.getDate() - 6);
      lastDay.setDate(date.getDate());
    } else {
      firstDay.setDate(date.getDate() - dayOfWeek + 1);
      lastDay.setDate(date.getDate() - dayOfWeek + 7);
    }

    firstDay.setHours(0, 0, 0, 0);
    lastDay.setHours(23, 59, 59, 999);

    return [firstDay, lastDay];
  }

  construirDiasSemana() {
    this.diasSemana = [];
    const [inicio, fim] = this.semanaAtual;
    for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
      this.diasSemana.push(new Date(d));
    }
  }

  isToday(dia: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dia.setHours(0, 0, 0, 0);
    return dia.getTime() === today.getTime();
  }

  filterTasksDay(date: Date): Task[] {
    const tasks: Task[] = [];
    date.setHours(0, 0, 0, 0);

    this.taskList.forEach(task => {
      const finalDate = new Date(task.finalDate);
      const scheduledDate = new Date(task.scheduledDate);
      finalDate.setHours(0, 0, 0, 0);
      scheduledDate.setHours(0, 0, 0, 0);

      if (this.isSameDay(date, finalDate) || this.isSameDay(date, scheduledDate)) {
        tasks.push(task);
      }
    });

    return tasks;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    date1 = new Date(date1)
    date2 = new Date(date2)
    console.log(date1);
    console.log(date2);
    
    if(date1.getFullYear == null ||date2.getFullYear == null  ){
      console.log("soy null");
      
    }
    console.log(date1.getFullYear == date2.getFullYear);
    
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }
}
