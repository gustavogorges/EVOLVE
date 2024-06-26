import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Dashboard } from 'src/model/dashboard';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

@Component({
  selector: 'app-modal-option-full-view',
  templateUrl: './modal-option-full-view.component.html',
  styleUrls: ['./modal-option-full-view.component.scss']
})
export class ModalOptionFullViewComponent implements OnInit, AfterViewInit {

  constructor(private service : BackendEVOLVEService, private elementRef: ElementRef,
    private cookies_service : CookiesService) { }
    
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
  @Input() confirmationAction !: Boolean | any
  @Output() quest: EventEmitter<string> = new EventEmitter<string>()

  nameDashEdited = ''
  @ViewChild('inputElement') inputElement !: ElementRef
  loggedUser : User = new User;

  async ngOnInit() {
    document.body.addEventListener('click', this.onDocumentClick);
    this.loggedUser = await this.cookies_service.getLoggedUser();
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
      this.quest.emit("Realmente deseja deletar a Dashboard?");

      try {
        const confirmation = await this.waitForConfirmation();
        this.confirmationAction = undefined;

        if (confirmation) {
          await this.service.deleteDashboard(this.projeto.id, this.dashboard.id, this.loggedUser.id)
          this.dashboards.splice(this.dashboards.indexOf(this.dashboard), 1)
        }

      } catch (ignore) { }
  }

  viewEdit(){
    this.viewEditBolEmit.emit(this.viewEditBol)
    if(this.viewEditBol){
      this.dashboard.name = this.nameDashEdited
      this.service.updateDashboardName(this.dashboard.id, this.projeto.id, this.dashboard)
      this.dashboardToedit.emit(this.dashboard)
    } else {
      this.nameDashEdited = this.dashboard.name
      this.dashboardToedit.emit(undefined)
    }
    this.viewEditBol = !this.viewEditBol

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

  waitForConfirmation(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {

      let timer: ReturnType<typeof setTimeout>;
      let intervalId: ReturnType<typeof setInterval>;

      timer = setTimeout(() => {
        clearInterval(intervalId);
      }, 30000);

      intervalId = setInterval(() => {
        if (typeof this.confirmationAction !== "undefined") {
          clearTimeout(timer);
          clearInterval(intervalId);
          resolve(this.confirmationAction as boolean);
        }
      }, 100);
    });
  };
}
