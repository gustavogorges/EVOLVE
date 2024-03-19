import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage-screes-separator',
  templateUrl: './landingpage-screes-separator.component.html',
  styleUrls: ['./landingpage-screes-separator.component.scss']
})
export class LandingpageScreesSeparatorComponent implements OnInit {

  constructor() { }

  cards : any[] = [
    {
      text : "to-do",
      color : "#67BFE0",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      text : "done",
      color : "#4C956C",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      text : "done",
      color : "#4C956C",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      text : "doing",
      color : "#F5D112",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      text : "doing",
      color : "#F5D112",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      text : "to-do",
      color : "#67BFE0",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      text : "doing",
      color : "#F5D112",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    },

    {
      text : "done",
      color : "#4C956C",
      checked1 : false,
      checked2 : false,
      checked3 : false,
      favorited: false
    }
  ]

  ngOnInit(): void {
    console.log(this.cards[0].checked1);
  }

  alterarTarefaFavoritado(i:number){
    this.cards[i].favorited = !this.cards[i].favorited
  }

}
