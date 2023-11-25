import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Query, Renderer2, ViewChild } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
@Component({
  selector: 'app-membros-equipe',
  templateUrl: './membros-equipe.component.html',
  styleUrls: ['./membros-equipe.component.scss']
})
export class MembrosEquipeComponent implements OnInit {

  constructor(private renderer : Renderer2, private service: BackendEVOLVEService) { }

  adicionado = false

  @Input() user!:Usuario
  @Output() adiconarUser:EventEmitter<Usuario> = new EventEmitter<Usuario>()

  ngOnInit(){
    this.getAllUsers()
  }

  membros:Usuario[] = []
  usuarios!:Usuario[]
  
  async getAllUsers(){
    this.usuarios = await this.service.getAllSomething('usuario')
  }

  adicionar(){
    this.adicionado = !this.adicionado
    this.adiconarUser.emit(this.user)
  }

  // @ViewChild('adicionado') addUser!:HTMLElement
  @ViewChild('bg') fundo !: ElementRef;
  ngAfterViewInit(){
    this.fundo.nativeElement.style.backgroundColor = this.randomizeColor()
    // let membros = localStorage.getItem('membros') || ''
    // this.membros.push(JSON.parse(membros))

    // this.usuarios.forEach(user => {
    //   this.membros.forEach(add => {
    //     if(user.id === add.id){
    //       this.adicionado = true
    //       this.addUser.classList.re()
    //     }
    //   });
    // });
  }

  
  randomizeColor(){
    let str = '#';
    while (str.length < 7) {
      str += Math.floor(Math.random() * 0x10).toString(16);
    }
    return str.toUpperCase()
  }

}
