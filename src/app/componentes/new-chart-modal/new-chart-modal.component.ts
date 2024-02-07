import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

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

  ngOnChanges(): void {
    if(!this.newChartBool){
      this.chooseChart(-1)
      
    }
  }

  createNewChart(){}

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
