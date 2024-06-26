import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
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
  labelChooseBol : boolean = false
  chartChoosed:number = -1
  labelChoosed:number = -1
  @Input() charts: any[] = []
  @Input() dashboard: any
  @Output() closeNewChart : EventEmitter<any> = new EventEmitter<any>()
  @Output() indexNewChart : EventEmitter<number> = new EventEmitter<number>()
  @Input() project !: Project

  labels : any[] = []

  ngOnChanges(): void {
    if(!this.newChartBool){
      this.chooseChart(-1)
      this.chooseLabel(-1)
      this.labelChooseBol = false
    }
  }

  chooseCharts(){
    this.labelChooseBol = !this.labelChooseBol
  }

  ngOnInit() {
    this.project.charts.forEach(element => {
    
      this.labels.push({
        id : element.id,
        style : '',
        value : element.label
      })
    });
  }

  async createNewChart(){
    let labelChoosed = this.getLabelById().value
    
    this.charts.forEach(element => {
      if(element.id === this.chartChoosed){
        this.project.charts.forEach(async (elementChart: DashBoardCharts) => {
            if(elementChart.label === labelChoosed){

              elementChart.type = element.type

              let chart = await this.service.setChartToDash(this.dashboard.id, this.project.id, elementChart);

              let updatedMatchingChart = { ...element, id: chart.id, data : {labels: this.getLabelsChart(chart), datasets : [ {label : chart.label, data : this.getValuesChart(chart),}]}};
              
              this.dashboard.charts.push(updatedMatchingChart)
            }
        });
      }
    })
    this.closeNewChart.emit()
  }

  getLabelsChart(chart : DashBoardCharts){
    let valueNames: string[][] = []
    if(chart.labels != null){
      chart.labels.forEach(chart => {
        valueNames.push(
            [
                chart.label
            ]
        )
      })
      return valueNames
    }
    return ['Nada encontrado']
}

getValuesChart(chart : DashBoardCharts){
    let valueLabels: number[][] = []

    if(chart.labels != null){
        chart.labels.forEach(chart => {
          valueLabels.push(
              [
                  chart.value
              ]
          )
      })
      return valueLabels
    }
    return [0]
}

  getLabelById(){
    return this.labels.find(label => label.id === this.labelChoosed);
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
        element.style = "border-primary"
      }
    });
  }

  chooseLabel(index:number){
    this.labels.forEach(element => {
      if(element.id != index){
        element.style = ""
      }
    });

    this.labelChoosed = index

    this.labels.forEach(element => {
      if(element.id === index){
        element.style = "border-primary"
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

   ngOnDestroy(){
    this.labelChoosed = -1
    this.labelChooseBol = false
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
