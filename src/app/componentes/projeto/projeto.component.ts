import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
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
  nomeProjeto = 'Projeto Weg'
  descricao:string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore. Lrem Ipsum is simply dummy text of the printing and typesetting industry. Lore'
  nome = ''
  prazo = ''
  progresso = 0
  status = ''
  md: any
  corAtual: string = ''
  valorProgresso = 0;


  @Output()
  deletar:EventEmitter<number> = new EventEmitter<number>()


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

  fechaProjeto(){
    this.projeto.isVisible = false
  }
}

