import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { Project } from 'src/model/project';
import { Task } from 'src/model/task';

import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss']
})
export class WeekCalendarComponent implements OnInit {

  constructor(private service: BackendEVOLVEService, private elRef: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskList']) {
      this.updateCalendar();
    }
  }

  taskList: Array<Task> = [];
  @Input() project!: Project;

  semanaAtual: Date[] = [];
  diasSemana: Date[] = [];

  async ngOnInit() {
    this.taskList = await this.service.getTasksByUserId(1)
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

  getWeek(date: Date) {
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
  
    return [firstDay, lastDay];
  }
  construirDiasSemana() {
    this.diasSemana = [];
    const [inicio, fim] = this.semanaAtual;
    for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
      this.diasSemana.push(new Date(d));
    }
  }

  updateCalendar() {
    // Atualizar o calendário com as novas tarefas
  }

  isSameDay(date1: Date, date2: Date | string) {
    if (typeof date2 === 'string') {
      // Converta a string para objeto Date, se necessário
      date2 = new Date(date2);
    }
  
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }
  isToday(dia : Date){
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    dia.setHours(0, 0, 0, 0)

   console.log(today);
   
   
   
   
   
    
    return dia.getTime()==today.getTime()
  }
  isDragging = false;
  startX!: number;
  scrollLeft!: number;

 

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - this.elRef.nativeElement.querySelector('.scroll-content').offsetLeft;
    this.scrollLeft = this.elRef.nativeElement.querySelector('.scroll-content').scrollLeft;

    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
  }

  endDrag() {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.drag.bind(this));
    document.removeEventListener('mouseup', this.endDrag.bind(this));
  }

  drag(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.elRef.nativeElement.querySelector('.scroll-content').offsetLeft;
    const walk = (x - this.startX) * 2; // Ajuste a sensibilidade aqui
    this.elRef.nativeElement.querySelector('.scroll-content').scrollLeft = this.scrollLeft - walk;
  }
}
