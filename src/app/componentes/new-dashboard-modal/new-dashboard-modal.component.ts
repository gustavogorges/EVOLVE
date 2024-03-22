import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-dashboard-modal',
  templateUrl: './new-dashboard-modal.component.html',
  styleUrls: ['./new-dashboard-modal.component.scss']
})
export class NewDashboardModalComponent implements OnInit, OnChanges {

  constructor() { }

  dashChoosed:number = -1
  squads: any[] = []
  @Input() newDashBool:Boolean = false
  @Output() newDash : EventEmitter<any> = new EventEmitter<any>()
  @Input() newDashId !: number
  nome = "teste"

  ngOnInit(): void {
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
    this.dashChoosed = 3
    this.createNewDash()
  }

  ngOnChanges(): void {
    if(!this.newDashBool){
      this.chooseDash(-1)
    }
  }

  createNewDash(){
    const dashBoard = {
      id:this.newDashId,
      nome:this.nome,
      style:this.squads,
      charts:[]
    }
    dashBoard.id = this.newDashId;
    this.squads.forEach(element => {
      if(element.id === this.dashChoosed){
        dashBoard.style = element.squad
      }
    });

    this.newDash.emit(dashBoard)
    this.nome = ""
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
          element.style = "border-primary border-4"
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

