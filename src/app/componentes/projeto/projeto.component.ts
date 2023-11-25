import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

interface Tarefa{
  nome : string,
  prazo : String,
  progresso : number,
  status : string
}

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService){}

  date: string = ''
  tarefas : Tarefa[] = []
  progresso = 0
  md: any
  corAtual: string = ''
  valorProgresso = 0;


  @Output()
  deletar:EventEmitter<number> = new EventEmitter<number>()

  @Output() openProjeto: EventEmitter<Projeto> = new EventEmitter<Projeto>()

  @Output() salvarProjeto: EventEmitter<Projeto> = new EventEmitter<Projeto>()

  @Input() projeto!:Projeto;
  
  setValorProgresso(num:number){
    this.valorProgresso = num
  }

  integrantes = [
    {
      cor: this.randomizeColor(),
      nome: 'felipe',
      tipo: 'Administrador'
    },
    {
      cor: this.randomizeColor(),
      nome: 'julio',
      tipo: 'convidado'
    },
    {
      cor: this.randomizeColor(),
      nome: 'felipe',
      tipo: 'Administrador'
    },
    {
      cor: this.randomizeColor(),
      nome: 'julio',
      tipo: 'convidado'
    },
    {
      cor: this.randomizeColor(),
      nome: 'felipe',
      tipo: 'Administrador'
    },
    {
      cor: this.randomizeColor(),
      nome: 'julio',
      tipo: 'convidado'
    },
  ]
  
  randomizeColor(){
    let str = '#';
    while (str.length < 7) {
      str += Math.floor(Math.random() * 0x10).toString(16);
    }
    return str.toUpperCase()
  }

  criaTarefa(){
    const task: Tarefa = {
      nome : 'Nome tarefa',
      prazo : '10/02',
      progresso : 90,
      status : 'Doing'
    }
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
    this.tarefas.push(task)
  }

  visivel(){}
  
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.verificaTamanhoTela()
  }

  ngOnInit(): void {
    this.getScreenSize()
    this.criaTarefa()
    this.randomizeColor()
    
  }

  verificaTamanhoTela() {
    if(window.innerWidth < 1024){
      this.md = true
    }else{
      this.md = false
    }
    this.projeto.isVisible = true
    setTimeout(() => {
      this.projeto.isVisible = false 
    },0.00001)
  }

  deletarProjeto(id:number){
    this.deletar.emit(id)
  }

  salvaProjeto(){
    this.salvarProjeto.emit(this.projeto)
  }

  openEfechaProjeto(){
    this.openProjeto.emit(this.projeto)
  }

}

