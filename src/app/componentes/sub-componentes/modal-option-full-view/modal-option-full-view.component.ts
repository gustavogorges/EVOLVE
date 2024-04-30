import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Dashboard } from 'src/model/dashboard';
import { Project } from 'src/model/project';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-modal-option-full-view',
  templateUrl: './modal-option-full-view.component.html',
  styleUrls: ['./modal-option-full-view.component.scss']
})
export class ModalOptionFullViewComponent implements OnInit {
  
  viewOptionsBol: boolean = false;
  viewEditBol: boolean = false;
  newDashVisibleBol: boolean = false;
  newChartBool: boolean = false;

  constructor(private service : BackendEVOLVEService) { }

  @Input() charts : any[] = []
  @Input() dashboards : any[] = []
  @Input() projeto !: Project
  @Input() dashboard !: Dashboard
  @Output() deleteChart : EventEmitter<any> = new EventEmitter
  ngOnInit(): void {
  }

  viewOptions(){
    this.viewOptionsBol = !this.viewOptionsBol
    this.viewEditBol = false

    }

    async deleteDashboard(){
        await this.service.deleteDashboard(this.dashboard.id)
        this.dashboards.splice(this.dashboards.indexOf(this.dashboard), 1)
    }

viewEdit(){
    this.viewEditBol = !this.viewEditBol
    this.newChartBool = false
    this.newDashVisibleBol = false
}

newChartVisible(){
  this.newChartBool = !this.newChartBool
  this.newDashVisibleBol = false
  this.viewEditBol = false
}

@ViewChild('Options') optionsMenu!: ElementRef;
    @ViewChild('dashElement') dashElement!: ElementRef;
    @ViewChild('statusClose') statusClose!:ElementRef
    @ViewChild('newChartElement') newChartElement!: ElementRef;
    @HostListener('click', ['$event'])
    outsideClick(event: any) {
        if (this.optionsMenu && !this.optionsMenu.nativeElement.contains(event.target) && !(event.target.tagName === "I")) {
            this.viewOptionsBol = true;
            this.viewEditBol = false;
        }
        
        if (this.dashElement && !this.dashElement.nativeElement.contains(event.target)) {
            this.newDashVisibleBol = false;
        }

        if (this.newChartElement && !this.newChartElement.nativeElement.contains(event.target)) {
            this.newChartBool = false;
        }
    }

}
