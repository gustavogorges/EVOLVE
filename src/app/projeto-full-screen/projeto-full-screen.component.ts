import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projeto-full-screen',
  templateUrl: './projeto-full-screen.component.html',
  styleUrls: ['./projeto-full-screen.component.scss']
})
export class ProjetoFullScreenComponent implements OnInit {

  constructor(private sla: Router) { }
  // state = {
  //   valor:'arroz',
  // }
  ngOnInit(): void {
    this.sla.navigate(['tela-tarefa'], {state: {value:'dawdawdawdawdawda'} })
  }

}
