import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Dashboard } from 'src/model/dashboard';
import { Project } from 'src/model/project';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-modal-option-full-view',
  templateUrl: './modal-option-full-view.component.html',
  styleUrls: ['./modal-option-full-view.component.scss']
})
export class ModalOptionFullViewComponent implements OnInit, AfterViewInit {

  constructor(private service : BackendEVOLVEService, private elementRef: ElementRef) { }
    
  viewEditBol:boolean = false
  @Input() charts : any[] = []
  @Input() dashboards : any[] = []
  @Input() projeto !: Project
  @Input() dashboard !: Dashboard
  @Input() viewOptionsBol !: boolean
  @Input() newChartBool: boolean = false
  @Output() deleteChart : EventEmitter<any> = new EventEmitter
  @Output() viewEditBolEmit : EventEmitter<any> = new EventEmitter
  @Output() dashboardToedit : EventEmitter<any> = new EventEmitter
  @Output() newChartElement : EventEmitter<any> = new EventEmitter
  nameDashEdited = ''
  @ViewChild('inputElement') inputElement !: ElementRef

  ngOnInit(): void {
    document.body.addEventListener('click', this.onDocumentClick);
  }

  ngAfterViewInit(): void {
    // Você pode garantir que o elemento seja focado apenas após a exibição ser inicializada
    if (this.inputElement && this.viewEditBol) {
      this.inputElement.nativeElement.focus();
    }
  }

  viewOptions(){
    this.viewOptionsBol = !this.viewOptionsBol
    this.viewEditBolEmit.emit(false)
    this.dashboardToedit.emit(undefined)
    this.newChartBool = false
  }

    ngOnDestroy(): void {
        document.body.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick = async (event: MouseEvent) => {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if(this.dashboard.name != this.nameDashEdited && this.viewEditBol) {
        this.dashboard.name = this.nameDashEdited
        this.dashboard = await this.service.updateDashboardName(this.dashboard.id, this.projeto.id, this.dashboard)
      }
      this.viewOptionsBol = true
      this.viewEditBolEmit.emit(true)
      this.dashboardToedit.emit(undefined)
      this.newChartBool = false
    }
  };

  async deleteDashboard(){
    await this.service.deleteDashboard(this.dashboard.id)
    this.dashboards.splice(this.dashboards.indexOf(this.dashboard), 1)
  }

  viewEdit(){
    this.nameDashEdited = this.dashboard.name
    this.viewEditBol = !this.viewEditBol
    this.viewEditBolEmit.emit(this.viewEditBol)
    if(this.viewEditBol){
      this.dashboardToedit.emit(this.dashboard)
    } else {
      this.dashboardToedit.emit(undefined)
    }
    this.newChartBool = false
  }

  newChartVisible(){
    this.newChartBool = !this.newChartBool
  }
  
  @ViewChild('newChartElement') chartElement !: ElementRef
  @HostListener('click', ['$event'])
  outsideClick(event: any) {
    this.newChartElement.emit(this.chartElement.nativeElement)
  }
}
