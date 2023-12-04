import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-tarefa-card-lista',
  templateUrl: './tarefa-card-lista.component.html',
  styleUrls: ['./tarefa-card-lista.component.scss']
})
export class TarefaCardListaComponent implements OnInit {
  @Input() tarefaAtual!:Tarefa
  valorBarra="0%";
  caminho = "assets/naoVector.svg"
  caminhoEstrela="assets/estrelaNaoMarcada.svg"
  nomeGrande ="";
  corStatus=""; 
  @Input() id: string = "";

data : Date = new Date

  listaSub = [
   "subtarefa",
   "b",
   "b",
   
 ]

 constructor(private service : BackendEVOLVEService ) {

  }

  ngOnInit(): void {
   this.trocaCor()
   if(this.tarefaAtual.favoritado){
     this.caminhoEstrela = "assets/estrelaMarcada.svg"
   }else{
     this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
   }
   this.valorBarra = 60 +"%"; 
   console.log(this.tarefaAtual.id + " "+this.tarefaAtual.statusAtual)
 
 }

 favoritar(){
   if (this.caminhoEstrela == "assets/estrelaNaoMarcada.svg"){
     this.caminhoEstrela = "assets/estrelaMarcada.svg"
     this.tarefaAtual.favoritado=true;
   } else {
     this.caminhoEstrela = "assets/estrelaNaoMarcada.svg"
     this.tarefaAtual.favoritado=false;

   }
   console.log(this.tarefaAtual)

 }

 trocaCor(){
   if(this.tarefaAtual.statusAtual.nome =="pendente"){
     this.corStatus="#7CD5F4"
   }else if(this.tarefaAtual.statusAtual.nome =="em progresso"){
     this.corStatus="#FCEC62"
   }else  if(this.tarefaAtual.statusAtual.nome =="Concluido"){
     this.corStatus="#86C19F"
   }
   else  if(this.tarefaAtual.statusAtual.nome =="não atribuido"){
     this.corStatus="#9CA3AE"
   }
   
 }



}
