import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards-carrosel',
  templateUrl: './cards-carrosel.component.html',
  styleUrls: ['./cards-carrosel.component.scss']
})
export class CardsCarroselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() task!:any
  @Output() favorited : EventEmitter<any> = new EventEmitter()
  
  alterarTarefaFavoritado(task:any){
    this.favorited.emit(task)
  }
}
