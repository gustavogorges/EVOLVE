import { getHtmlTagDefinition, HtmlTagDefinition } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { window } from 'rxjs';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('theme') === 'dark'){
      this.themeDark = true
    }
    this.darkMode()
  }

  themeDark = false

  darkMode(){
    if(this.themeDark){
      document.documentElement.classList.add('dark')
      document.querySelector('.pi-moon')?.classList.add('pi-sun')
      document.querySelector('.pi-moon')?.classList.remove('pi-moon')
      localStorage.setItem('theme','dark')
    }else{
      document.documentElement.classList.remove('dark')
      document.querySelector('.pi-sun')?.classList.add('pi-moon')
      document.querySelector('.pi-sun')?.classList.remove('pi-sun')
      localStorage.setItem('theme','light')
    }
    this.themeDark = !this.themeDark
  }

}
