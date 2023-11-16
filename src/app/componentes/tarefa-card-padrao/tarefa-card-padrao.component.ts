import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Input } from '@angular/core';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tarefa-card-padrao',
  templateUrl: './tarefa-card-padrao.component.html',
  styleUrls: ['./tarefa-card-padrao.component.scss']
})
export class TarefaCardPadraoComponent  {
   valorBarra="0%";
   caminho = "assets/naoVector.svg"
   caminhoEstrela="assets/estrelaNaoMarcada.svg"
   

   
   @Input() id: string = "";

   listaSub = [
    "subtarefa",
    "b",
    "b",
    
  ]

  constructor(private service : BackendEVOLVEService ) {
 
   }

  ngOnInit(): void {
    this.valorBarra = 60 +"%"; 

  
  }

  favoritar(){
    let tarefas;
    if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
      this.caminhoEstrela = "assets/estrelaMarcada.svg"
    } else {
      this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
    }
    this.service.getAllSomething("tarefa")
    .then(response => {
    
      console.log(response)
    })
    .catch(error => {
      console.log(error);
    });

    this.service.getOne("tarefa",1)
    .then(response => {
    
      console.log(response)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    })
    .catch(error => {
      console.log(error);
    });

  
  }


}