import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  revela:boolean = false

  constructor() { }
  width = "30rem"
  ngOnInit(): void {
  }

  revelaInfos(){
    this.revela = !this.revela
  }
}
