import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards-carrosel',
  templateUrl: './cards-carrosel.component.html',
  styleUrls: ['./cards-carrosel.component.scss']
})
export class CardsCarroselComponent implements OnInit {

  constructor() { }

  

  @Input() task!:any
  @Output() favorited : EventEmitter<any> = new EventEmitter()
  
  ngOnInit(): void {}

  alterarTarefaFavoritado(){
    this.favorite = !this.favorite
  }
  checked1 = false
  checked2 = false
  checked3 = false
  favorite = false
}
