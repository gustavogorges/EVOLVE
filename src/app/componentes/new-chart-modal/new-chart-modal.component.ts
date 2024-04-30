import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { indexOf } from 'lodash';
import { DashBoardCharts } from 'src/model/DashBoardCharts';
import { Project } from 'src/model/project';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-new-chart-modal',
  templateUrl: './new-chart-modal.component.html',
  styleUrls: ['./new-chart-modal.component.scss']
})
export class NewChartModalComponent implements OnChanges, OnInit {

  constructor(private service : BackendEVOLVEService) { }

  @Input() newChartBool !: Boolean
  chartChoosed:number = -1
  @Input() charts: any[] = []
  @Input() dashboard: any
  @Output() closeNewChart : EventEmitter<any> = new EventEmitter<any>()
  @Output() indexNewChart : EventEmitter<number> = new EventEmitter<number>()
  @Input() project !: Project

  ngOnChanges(): void {
    if(!this.newChartBool){
      this.chooseChart(-1)
      
    }
  }

  ngOnInit() {
    // console.log(this.dashboard);
    
    // this.dashboard.charts.sort((a: any, b: any) => a.chartIndex - b.chartIndex);

    // this.dashboard.charts = this.dashboard.charts.map((elementDash: any) => {
    //     const matchingChart = this.charts.find((elementChart: any) => {
    //         return elementDash.label === elementChart.data.datasets[0].label;
    //     });

    //     if (matchingChart) {
          
    //       matchingChart.id = elementDash.id
    //       console.log(elementDash.id);
          
    //       return matchingChart;
                
    //     }
    // }).filter((element: any) => element);

    // console.log(this.dashboard.charts);
}

  async createNewChart(){
    this.charts.forEach(element => {
      if(element.id === this.chartChoosed){
        this.project.charts.forEach(async (elementChart: DashBoardCharts) => {
          console.log(elementChart.label, element.data.datasets[0].label);
            if(elementChart.label === element.data.datasets[0].label){
              this.dashboard.charts.push(element)
              await this.service.setChartToDash(this.dashboard.id, this.project.id, elementChart)
            }
        });
      }
    });
    this.closeNewChart.emit()
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
