import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Projeto } from 'src/model/projeto';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';



@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService){}

  ngOnInit(): void {
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
        membros: [],
        isVisible: false
      }
      this.service.postProjeto(projeto)
    }else{
      alert('campo vazio')
    }
    this.nome.nativeElement.value = ''
    this.data.nativeElement.value = ''
    this.descricao.nativeElement.value = ''
  }

}
