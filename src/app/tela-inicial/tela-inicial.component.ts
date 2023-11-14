import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  booleanTask:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openTask() :void {
    this.booleanTask = !this.booleanTask;
  }

}
