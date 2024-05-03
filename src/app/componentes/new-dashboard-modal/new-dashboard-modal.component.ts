import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { DashBoardCharts } from 'src/model/DashBoardCharts';
import { Dashboard } from 'src/model/dashboard';
import { Project } from 'src/model/project';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-new-dashboard-modal',
  templateUrl: './new-dashboard-modal.component.html',
  styleUrls: ['./new-dashboard-modal.component.scss']
})
export class NewDashboardModalComponent implements OnInit, OnChanges {

  constructor(private service:BackendEVOLVEService) { }

  dashChoosed:number = -1
  squads: any[] = []
  @Input() newDashBool:Boolean = false
  @Output() newDash : EventEmitter<any> = new EventEmitter<any>()
  @Input() newDashId !: number
  @Input() project !: Project
  @Input() dashboards : any[] = []
  name : string = ''
  projectLoaded$ = new Subject<void>();

  ngOnInit(){
    this.squads.push(
      {
        id:0,
        style:"",
        squad: [
          "col-span-2 row-span-2",
          "auto-cols-auto",
          "auto-cols-auto",
          "auto-cols-auto",
          "auto-cols-auto"
        ]
      },
      {
        id:1,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "auto-cols-auto",
          "auto-cols-auto",
          "col-start-3 col-end-5"
        ]
      },
      {
        id:2,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "col-start-3 row-span-2 col-end-5"
        ]
      },
      {
        id:3,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "col-start-3 col-end-5",
          "",
          ""
        ]
      },
      {
        id:4,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "col-start-3 col-end-5",
          "col-start-3 col-end-5"
        ]
      },
      {
        id:5,
        style:"",
        squad:[
          " col-span-full row-span-full"
        ]
      },
    )
  }

  // async ngAfterViewInit() {
  //   const project = await this.waitForProject();

  //   if (project) {
  //     this.dashboards.forEach((element: any) => {
  //       this.newDash.emit(element)
  //     });
  //   } else {
  //       console.error('Project not find');
  //   }
  // }
  
  async waitForProject(): Promise<Project> {
    return new Promise<Project>((resolve) => {
        const checkProject = () => {
            if (this.project) {
                resolve(this.project);
            } else {
                setTimeout(checkProject, 100);
            }
        };
        checkProject();
    });
  }

  ngOnChanges(): void {
    if(!this.newDashBool){
      this.chooseDash(-1)
    }
  }

  async createNewDash(){
    let dashboard = new Dashboard
    dashboard.name = this.name
    this.squads.forEach(element => {
      if(element.id === this.dashChoosed){
        dashboard.styleDash = element.squad
      }
    });
    this.newDash.emit(await this.service.postDashboard(dashboard, this.project.id))
    this.name = ""
    this.dashChoosed = -1
    this.chooseDash(-1)
  }


  chooseDash(index:number){
      this.squads.forEach(element => {
        if(element.id != index){
          element.style = ""
        }
      });

      this.dashChoosed = index

      this.squads.forEach(element => {
        if(element.id === index){
          if(localStorage.getItem('theme') === 'dark'){
            element.style = "border-dark-primary"
          }else{
            element.style = "border-primary"
          }
        }
      });
  }

  @HostListener('click', ['$event'])
  clickOutside(event:any){
    const element = event.target.classList.value.includes(('squad')) || event.target.tagName === "BUTTON" || event.target.tagName === "INPUT";
      if(!element){
        this.dashChoosed = -1
        this.chooseDash(-1)
      }
   }
}

