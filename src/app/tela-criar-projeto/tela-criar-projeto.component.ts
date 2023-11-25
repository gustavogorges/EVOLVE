import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';



@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService){}

  ngOnInit(): void {
    this.getMembros()
    // let membros = localStorage.getItem('membros') || ''
    // this.membros.push(JSON.parse(membros))
  }

  usuarios!: Usuario[]

  async getMembros(){
    this.usuarios = await this.service.getAllSomething('usuario')
  }


  @ViewChild('nome') nome !:ElementRef
  @ViewChild('data') data !:ElementRef
  @ViewChild('descricao') descricao !:ElementRef
  salvarProjeto(){
    let nome = this.nome.nativeElement.value
    let data = this.data.nativeElement.value
    let descricao = this.descricao.nativeElement.value

    if(nome!=null && nome!='' &&
    data != null && data!='' &&
    descricao != null && descricao != ''){
      const projeto: Projeto = {
        id: 0, //auto generate
        nome: this.nome.nativeElement.value,
        dataFinal: this.data.nativeElement.value,
        descricao: this.descricao.nativeElement.value,
        tarefas: [],
        propriedades: [],
        membros: this.membros,
        isVisible: false
      }
      console.log(projeto)
      this.service.postProjeto(projeto)
    }else{
      alert('campo vazio')
    }
    this.nome.nativeElement.value = ''
    this.data.nativeElement.value = ''
    this.descricao.nativeElement.value = ''
    // localStorage.removeItem('membros')
  }

  addUser(p:Usuario){
    // console.log(p.email)
    this.membros.push(p)
    // console.log(this.membros)
    // localStorage.setItem('membros',JSON.stringify(this.membros))
  }

  membros: Usuario[] = []

}
