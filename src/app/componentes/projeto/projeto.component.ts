import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/model/project';
import { User } from 'src/model/user';

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

  constructor(private route:Router){}

  date: string = ''
  tarefas : Tarefa[] = []
  progresso = 0
  md: any
  corAtual: string = ''
  valorProgresso = 0;


  @Output()
  deletar:EventEmitter<number> = new EventEmitter<number>()

  @Output() openProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Output() salvarProjeto: EventEmitter<Project> = new EventEmitter<Project>()

  @Input() projeto!:Project;
  
  setValorProgresso(num:number){
    this.valorProgresso = num
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
  }

  randomizeColor(){
    let str = '#';
    while (str.length < 7) {
      str += Math.floor(Math.random() * 0x10).toString(16);
    }
    return str.toUpperCase()
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

  verifyImage(user:User){
    if(user.image.data){
      return false
    } else if(user.imageColor){
      return true
    }
    return true
    // if(user.profilePicture.length>10){
    //   return false
    // }else{
    //   return true
    // }
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

  async irParaProjeto(){
    this.route.navigate(['view-project'], {state : {id:''}})
  }
}

