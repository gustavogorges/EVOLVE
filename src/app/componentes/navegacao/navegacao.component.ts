import { getHtmlTagDefinition, HtmlTagDefinition } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent implements OnInit {

  constructor(private router: Router) { }
  sideBar = true

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
  irParaPerfil(): void {
    this.router.navigate(['/tela-perfil'], { state: { user: null } });  }
  goInitialPage(): void {
    this.router.navigateByUrl('/tela-inicial');
  }
  openSideBar(){
    if(this.sideBar==true){
      this.sideBar=false
    }else{
      this.sideBar=true
    }
    console.log(this.sideBar);
    
  }
  closeSideBar(bar : boolean){
    this.sideBar=false
  }

}
