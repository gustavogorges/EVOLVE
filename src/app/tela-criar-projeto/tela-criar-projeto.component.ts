import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projeto } from 'src/model/projeto';
import { Status } from 'src/model/status';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';



@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route: ActivatedRoute){}

  async ngOnInit(){
    this.projeto = JSON.parse(localStorage.getItem('projeto') || '') as Projeto
    console.log(this.projeto);
    
    this.getMembros()
  }

  projeto!:Projeto

  usuarios!: Usuario[]

  async getMembros(){
    this.usuarios = await this.service.getAllSomething('usuario')
  }

  statusEnabled(){
    this.statusVisible = !this.statusVisible
  }

  updateProject(p:Projeto){
    this.projeto.listaStatus = p.listaStatus
    this.service.putProjeto(p)
  }

  @ViewChild('nome') nome!:ElementRef
  @ViewChild('data') data!:ElementRef
  @ViewChild('descricao') descricao!:ElementRef
  async salvarProjeto(){
    this.projeto.nome = this.nome.nativeElement.value
    this.projeto.dataFinal = this.data.nativeElement.value
    this.projeto.descricao = this.descricao.nativeElement.value
    this.projeto.membros = this.membros
    console.log(await this.service.putProjeto(this.projeto));
  }

  addUser(p:Usuario[]){
    // console.log(p.email)
    this.membros = p
    // localStorage.setItem('membros',JSON.stringify(this.membros))
  }

  membros: Usuario[] = []

  @HostListener('click', ['$event'])
   clicouFora(event:any){
    const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c79'))
    || event.target.classList.value === 'add-status'
    || event.target.getAttributeNames().find((name: string | string[]) => name.includes('style'))
      if(!element){
        this.statusVisible = false;
      }
   }

   statusVisible = false

}
