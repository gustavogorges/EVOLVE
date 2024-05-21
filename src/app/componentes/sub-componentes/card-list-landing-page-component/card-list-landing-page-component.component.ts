import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-list-landing-page-component',
  templateUrl: './card-list-landing-page-component.component.html',
  styleUrls: ['./card-list-landing-page-component.component.scss']
})
export class CardListLandingPageComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  favorite = false
  favorite2 = false
  
  alterarTarefaFavoritado(){
    this.favorite = !this.favorite
  }

  alterarTarefaFavoritado2(){
    this.favorite2 = !this.favorite2
  }
}
