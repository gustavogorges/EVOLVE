import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tarefa-card-padrao',
  templateUrl: './tarefa-card-padrao.component.html',
  styleUrls: ['./tarefa-card-padrao.component.scss']
})
export class TarefaCardPadraoComponent  {
   valorBarra="0%";
   caminho = "assets/naoVector.svg"

  constructor() { }

  ngOnInit(): void {
    this.valorBarra = 10 +"%"; 

  
  }

  bomdia(){
    if (this.caminho == "assets/naoVector.svg"){
      this.caminho = "assets/vector1.svg"
    } else {
      this.caminho = "assets/naoVector.svg"
    }

  
  }


}