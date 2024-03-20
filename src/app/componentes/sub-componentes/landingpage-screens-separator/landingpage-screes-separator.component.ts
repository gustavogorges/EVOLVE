import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage-screes-separator',
  templateUrl: './landingpage-screes-separator.component.html',
  styleUrls: ['./landingpage-screes-separator.component.scss']
})
export class LandingpageScreesSeparatorComponent implements OnInit {

  constructor() { }

  status : any[] = [
    {
      status: "to-do",
      color: "#67BFE0"
    },
    {
      status: "done",
      color: "#4C956C"
    },
    {
      status: "doing",
      color: "#F5D112"
    },
  ]

  cards : any[] = [
    {
      status : this.status[0].status,
      color : this.status[0].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      status : this.status[1].status,
      color : this.status[1].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      status : this.status[1].status,
      color : this.status[1].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      status : this.status[2].status,
      color : this.status[2].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      status : this.status[2].status,
      color : this.status[2].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      status : this.status[0].status,
      color : this.status[0].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      status : this.status[2].status,
      color : this.status[2].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      status : this.status[1].status,
      color : this.status[1].color,
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    }
  ]

  ngOnInit(): void {
    console.log(this.cards[0].checked1);
  }

  alterarTarefaFavoritado(task:any){
    task.favorited = !task.favorited
  }

}
