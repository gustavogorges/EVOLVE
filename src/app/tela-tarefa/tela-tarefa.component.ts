
import axios from 'axios';
import { PrimeIcons } from 'primeng/api';
import { Projeto } from 'src/model/projeto';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tarefa } from 'src/model/tarefa';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Status } from 'src/model/status';

interface Bah {
  name:string,
  type:string
  id:number
}

@Component({
  selector: 'app-tela-tarefa',
  templateUrl: './tela-tarefa.component.html',
  styleUrls: ['./tela-tarefa.component.scss']
  // 
})
export class TelaTarefaComponent implements OnInit {

  selectedVisualizacao = "Visualização";
  select : string = "Padrao";
  listaTarefas: Array<Tarefa> =[]
  booleanTask : boolean = false;

  tarefaSelecionada:Tarefa = new Tarefa
  tarefaNova : Tarefa = new Tarefa;
  listaNova :Array<Tarefa>=[];
  tarefaMovida !:any

  listOptions :Array<string>=[]
  listIcons : Array<string>=[]
  visualizacaoVisible:boolean = false
  ordenacaoVisible:boolean = false
  filtroVisible:boolean = false
  projeto !:Projeto
  option  : string ="Kanban"
  optionFilter : string = ""

  constructor(private service : BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    this.listaNova = await this.service.getAllSomething("tarefa")
    this.listaTarefas =await this.service.getAllSomething("tarefa")
    this.projeto = await this.service.getOne("projeto",2652)
    console.log(this.projeto.listaStatus)
  }

  changeVisualizacao(e:any){
    this.ordenacaoVisible=false
    this.filtroVisible=false

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

  @HostListener('click', ['$event'])
  clicouFora(event:any){
   const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c77') ||
    name.includes('c72') ||
    name.includes('c64') ||
    name.includes('c70') || 
    name.includes('c73') || 
    name.includes('c78') ||
    name.includes('c71') ||
    name.includes('c79'));
     if(!element){
       for(let pFor of this.listaTarefas){
           this.closeTask();
       }
     }
  }

  closeTask() {
    this.tarefaNova = new Tarefa;
    this.booleanTask = false;
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
  
   async optionC(option : any){
    if(option=="Status"){
      this.optionFilter="";
  }else{
    this.optionFilter=option
    this.optionFilter=this.optionFilter.toLowerCase()


  }
    this.ordenacaoVisible=false;
    this.visualizacaoVisible=false;
    
   
      this.projeto.listaStatus.map((status : Status)=>{
      
        if(status.nome==option){
          this.listaTarefas =[]
          console.log("foi puta merdaaa")
          this.listaNova.map((tarefa : Tarefa)=>{
            console.log(tarefa.statusAtual.nome)

            if(tarefa.statusAtual.nome==option){
              this.listaTarefas.push(tarefa)
              console.log("eueuue")
              this.filtroVisible=false      

            }
          })

        } 

      }
    
      )
    
      if(option=="Favorito"){
        this.listaTarefas =[]
        console.log("de novvooo")
        this.listaNova.map((tarefa : Tarefa)=>{
          if(tarefa.favoritado==true){
            this.listaTarefas.push(tarefa)
          }
        }
        )
        this.filtroVisible=false      

      }
    
  
  }


  


  openTask(tarefa:Tarefa) :void {
    this.booleanTask = !this.booleanTask;

    this.tarefaSelecionada = tarefa;

  }

  openTaskEdit() {
    this.tarefaSelecionada = this.tarefaNova;
    this.booleanTask = true;
  }

  adicionarTarefa() {
    this.tarefaSelecionada.id = 0;
    this.booleanTask = !this.booleanTask;
  }
  async removeFilter(){
    this.listaTarefas =await this.service.getAllSomething("tarefa")
    this.optionFilter=""
  }
  onDropSuccess(event: any, novoIndice: number): void {
    const tarefa: Tarefa = event.dragData;
    // Aqui você pode realizar a lógica de atualização do estado da tarefa no seu modelo de dados
    // por exemplo, mover a tarefa para o novo índice na lista de tarefas
  }

  filtrarLista(status:Status): Array<Tarefa> {
    let listaFiltrada = this.listaTarefas.filter(
      (tarefa: Tarefa) => tarefa.statusAtual.nome === status.nome
    );
    return listaFiltrada 
  }

  onDrop(event: CdkDragDrop<Tarefa[]>, status:Status): void {
    console.log("sto aq")
    console.log(event.item)
    console.log(event.container)
    console.log(event.previousIndex)

    if (event.previousContainer === event.container) {
        // Reorder within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move item to a different list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the status of the task in your data model
      const movedTask: Tarefa = event.container.data[event.currentIndex];
      movedTask.statusAtual = status;
    }
  }
  

}