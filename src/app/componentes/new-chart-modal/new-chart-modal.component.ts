import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-chart-modal',
  templateUrl: './new-chart-modal.component.html',
  styleUrls: ['./new-chart-modal.component.scss']
})
export class NewChartModalComponent implements OnChanges {

  constructor() { }

  @Input() newChartBool !: Boolean
  chartChoosed:number = -1
  @Input() charts: any[] = []
  @Input() dashboard: any
  @Output() closeNewChart : EventEmitter<any> = new EventEmitter<any>()

  ngOnChanges(): void {
    if(!this.newChartBool){
      this.chooseChart(-1)
      
    }
  }

  createNewChart(){
    console.log(this.dashboard);
    this.charts.forEach(element => {
      if(element.id === this.chartChoosed){
        this.dashboard.charts.push(element)
      }
    });
    if(this.dashboard.charts.length === this.dashboard.style.length){
      this.closeNewChart.emit()
    }
  }

  chooseChart(index:number){
    this.charts.forEach(element => {
      if(element.id != index){
        element.style = ""
      }
    });

    this.chartChoosed = index

    this.charts.forEach(element => {
      if(element.id === index){
        element.style = "border-primary border-4"
      }
    });
  }

  @HostListener('click', ['$event'])
  clickOutside(event:any){
    const element = event.target.classList.value.includes(('squad')) 
    || event.target.tagName === "BUTTON" || event.target.tagName === "P" 
    || event.target.tagName === "CANVAS";

      if(!element){
        this.chartChoosed = -1
        this.chooseChart(-1)
      }
   }

   gotoTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
}

}
