import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-landing-page-component',
  templateUrl: './calendar-landing-page-component.component.html',
  styleUrls: ['./calendar-landing-page-component.component.scss']
})

export class CalendarLandingPageComponentComponent implements OnInit {

  constructor() { }

  tasks : any[] = []
  date = ''
  dayWeek = ''
  ngOnInit(): void {
  }

  setData(event:any){
    this.tasks = []
    let task : any

    if (event.target.tagName.toLowerCase() != "div") {
      event = event.target.parentNode;
    }else{
      event = event.target
    }
    
    if(event.children.length > 2){
      let task2 : any
      task = event.children[1].innerText
      task2 = event.children[2].innerText
      this.tasks.push(task, task2)
    }else if(event.children.length > 1){
      task = event.children[1].innerText
      this.tasks.push(task)
    }
    this.dayWeek = event.parentElement.children[0].innerText;
    this.date = `${event.children[0].innerText}/05/2024`
  }
}
