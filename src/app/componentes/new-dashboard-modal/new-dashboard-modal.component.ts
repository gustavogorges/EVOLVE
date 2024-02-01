import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-dashboard-modal',
  templateUrl: './new-dashboard-modal.component.html',
  styleUrls: ['./new-dashboard-modal.component.scss']
})
export class NewDashboardModalComponent implements OnInit {

  constructor() { }

  dashChoosed:number = 0
  squads: any[] = []

  ngOnInit(): void {
    this.squads.push(
      {
        id:1,
        style:"",
        squad: [
          "col-span-2 row-span-2",
          "",
          "",
          "",
          ""
        ]
      },
      {
        id:2,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "",
          "",
          "col-start-3 col-end-5"
        ]
      },
      {
        id:3,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "col-start-3 row-span-2 col-end-5"
        ]
      },
      {
        id:4,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "col-start-3 col-end-5",
          "",
          ""
        ]
      },
      {
        id:5,
        style:"",
        squad:[
          "col-span-2 row-span-2",
          "col-start-3 col-end-5",
          "col-start-3 col-end-5"
        ]
      },
      {
        id:6,
        style:"",
        squad:[
          "col-span-full row-span-full",
        ]
      }
  )
    
  }

  @Input() newDashBool!:Boolean

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
        this.dashChoosed = 0
        this.chooseDash(0)
      }
   }
}
