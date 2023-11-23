import { Component, ElementRef, OnInit, Query, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-membros-equipe',
  templateUrl: './membros-equipe.component.html',
  styleUrls: ['./membros-equipe.component.scss']
})
export class MembrosEquipeComponent implements OnInit {

  constructor(private renderer : Renderer2) { }

  adicionado = false

  ngOnInit(): void {
  }

  adicionar(){
    this.adicionado = !this.adicionado
  }

  @ViewChild('bg') fundo !: ElementRef;
  ngAfterViewInit(){
    this.fundo.nativeElement.style.backgroundColor = this.randomizeColor()
  }

  randomizeColor(){
    let str = '#';
    while (str.length < 7) {
      str += Math.floor(Math.random() * 0x10).toString(16);
    }
    return str.toUpperCase()
  }

}
