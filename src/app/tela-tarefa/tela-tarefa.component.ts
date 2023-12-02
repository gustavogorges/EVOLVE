import { Component, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { PrimeIcons } from 'primeng/api';
import { Projeto } from 'src/model/projeto';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

interface Bah {
  name:string,
  type:string
  id:number
}

@Component({
  selector: 'app-tela-tarefa',
  templateUrl: './tela-tarefa.component.html',
  styleUrls: ['./tela-tarefa.component.scss']
})
export class TelaTarefaComponent implements OnInit {



  listaTarefas: Array<Tarefa> =[]
  listOptions :Array<string>=[]
  listIcons : Array<string>=[]
  visualizacaoVisible:boolean = false
  ordenacaoVisible:boolean = false
  filtroVisible:boolean = false
  projetos !: Array<Projeto> 
  option  : string ="Padrão"

  constructor(private service : BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    
    this.listaTarefas =await this.service.getAllSomething("tarefa")
    console.log(this.listaTarefas)
  }

  changeVisualizacao(e:any){
    this.ordenacaoVisible=false
    this.filtroVisible=false

    console.log(this.visualizacaoVisible)
    e.target.value = "Visualização"

    this.listOptions = [
      "Padrão","Kanban","Lista","Calendario"
    ]
    this.listIcons = [
      PrimeIcons.TH_LARGE, PrimeIcons.MAP, PrimeIcons.BARS, PrimeIcons.CALENDAR
    ]
if( this.visualizacaoVisible==true){
    this.visualizacaoVisible=false;

  }else {
    this.visualizacaoVisible=true;

  }
  console.log(this.visualizacaoVisible)


    
  }
  
  optionA(option : any){
  
    this.visualizacaoVisible=false;
    
    this.option=option
    console.log(option)
  }

  changeOrdenacao(e:any){
    this.visualizacaoVisible=false
    this.filtroVisible=false

    console.log(this.ordenacaoVisible)
    e.target.value = "Visualização"

    this.listOptions = [
      "Data final","Progresso","Prioridade","Agendamento"
    ]
    this.listIcons = [
      PrimeIcons.CALENDAR, PrimeIcons.CHART_LINE, PrimeIcons.EXCLAMATION_CIRCLE, PrimeIcons.CALENDAR_TIMES
    ]
if( this.ordenacaoVisible==true){
    this.ordenacaoVisible=false;

  }else {
    this.ordenacaoVisible=true;

  }
  console.log(this.ordenacaoVisible)


    
  }
  
  optionB(option : any){
  
    this.ordenacaoVisible=false;
    this.visualizacaoVisible=false;

    console.log(option)
  }
  changeFiltro(e:any){
    this.visualizacaoVisible=false
    this.ordenacaoVisible=false

    
    this.listOptions = [
      "Status","Associado","Prioridade","Favorito"
    ]
    this.listIcons = [
      PrimeIcons.SPINNER, PrimeIcons.USER, PrimeIcons.EXCLAMATION_CIRCLE, PrimeIcons.STAR
    ]
if( this.filtroVisible==true){
    this.filtroVisible=false;

  }else {
    this.filtroVisible=true;

  }
  console.log(this.filtroVisible)


    
  }
  
  optionC(option : any){
  
    this.filtroVisible=false;
    console.log(option)
    if(option=="status"){
     async () => {
      this.projetos = await axios.get("projeto")
      
     }
    }
  }


  


}
