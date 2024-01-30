import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Projeto } from 'src/model/project';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tela-criar-projeto',
  templateUrl: './tela-criar-projeto.component.html',
  styleUrls: ['./tela-criar-projeto.component.scss']
})
export class TelaCriarProjetoComponent implements OnInit {

  constructor(private service : BackendEVOLVEService, private route: Router){}
  msgs!:Message[]
  
  async ngOnInit(){
    let projeto = JSON.parse(localStorage.getItem('projeto') || '') as Projeto
    this.projeto = await this.service.getOne("projeto", projeto.id)
    this.usuarios = await this.service.getAllSomething('usuario')
  }
  
  messages: Message[] | undefined;
  projeto!:Projeto
  usuarios!: User[]

  statusEnabled(){
    this.statusVisible = !this.statusVisible
  }

  updateProject(p:Projeto){
    this.projeto.statusList = p.statusList
    this.service.putProjeto(p)
  }

  @ViewChild('nome') nome!:ElementRef
  @ViewChild('data') data!:ElementRef
  @ViewChild('descricao') descricao!:ElementRef
  async salvarProjeto(){
    this.projeto.name = this.nome.nativeElement.value
    this.projeto.finalDate = this.data.nativeElement.value
    this.projeto.description = this.descricao.nativeElement.value
    await this.service.putProjeto(this.projeto);
    this.route.navigate(['tela-projeto'])
  }

  // @HostListener('click', ['$event'])
  //  clicouFora(event:any){
  //   const element = event.target.getAttributeNames().find((name: string | string[]) => name.includes('c79'))
  //   || event.target.classList.value === 'add-status'
  //   || event.target.getAttributeNames().find((name: string | string[]) => name.includes('style') ? true : false) ? true : false
  //   || event.target.getAttributeNames().find((name: string | string[]) => name.includes('c78-0') ? true : false) ? true : false
  //   console.log(element, event.target);
    
  //     if(!element){
  //       // this.statusVisible = false;
  //     }
  //  }

   async cancelar(){
      this.service.deleteById('projeto', this.projeto.id)
      this.route.navigate(['/tela-projeto'])
   }

   statusVisible = false

   ngAfterViewInit(){
    this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
   }

}
