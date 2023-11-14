import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrega-prox',
  templateUrl: './entrega-prox.component.html',
  styleUrls: ['./entrega-prox.component.scss']
})
export class EntregaProxComponent implements OnInit {

  @Input() titulo: string = ""
  @Input() dataFinal: string = ""
  @Input() favoritado: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
