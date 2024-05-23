import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';

@Component({
  selector: 'app-tela-landing-page',
  templateUrl: './tela-landing-page.component.html',
  styleUrls: ['./tela-landing-page.component.scss']
})
export class TelaLandingPageComponent implements OnInit {
  constructor(private router: Router) { 
    
  }
  ngOnInit(): void {
  }

  carouselItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  devsArray : any[] = [
    {
      name : 'Gustavo Gorges Koch',
      description : '18 anos, atuando atualmente pela Weg no centroWeg como fullStack',
      area : 'FullStack',
      image : 'assets/gorges.jpg',
      github : 'https://github.com/gustavogorges'
    },
    {
      name : 'Felipe Tomio',
      description : '18 anos com diploma técnico de desenvolvimento de sistemas pelo Senai e atualmente atua pela Weg no centroWeg como fullStack. Github: felipe-t-maciel | Instagram: @_fenipee',
      area : 'FullStack',
      image : 'assets/felipe.jpeg',
      github : 'https://github.com/Felipe-T-Maciel'
    },
    {
      name : 'Thiago Alessandro Batista',
      description : '18 anos, atuando atualmente pela Weg no centroWeg como fullStack',
      area : 'FullStack',
      image : 'assets/Thiago.jpg',
      github : "https://github.com/Thiago-Alessandro"
    },
    {
      name : 'Simon',
      description : '18 anos, atuando atualmente pela Weg no centroWeg como fullStack',
      area : 'FullStack',
      image : 'assets/Saymon.jpg',
      github : "https://github.com/Saymon-Silva"
    },
    {
      name : 'Deborah Mattge',
      description : '18 anos, atuando atualmente pela Weg no centroWeg como fullStack',
      area : 'FullStack',
      image : 'assets/debora.jpg',
      github : 'https://github.com/deborah-mattge'
    }
  ]

  activeIndex = 2;

  get visibleDevs() {
    const start = (this.activeIndex - 2 + this.devsArray.length) % this.devsArray.length;
    return [
      this.devsArray[(start + 0) % this.devsArray.length],
      this.devsArray[(start + 1) % this.devsArray.length],
      this.devsArray[(start + 2) % this.devsArray.length],
      this.devsArray[(start + 3) % this.devsArray.length],
      this.devsArray[(start + 4) % this.devsArray.length],
    ];
  }

  nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.devsArray.length;
  }

  previousSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.devsArray.length) % this.devsArray.length;
  }

  isCenter(index: number): boolean {
    return index === 2;
  }

  setThisMember(dev:any){
    if(this.activeIndex === this.devsArray.indexOf(dev)){
      window.location.replace(dev.github)
    }else{
      this.activeIndex = this.devsArray.indexOf(dev)
    }
  }

  getDevIndex(globalIndex: number): number {
    return (this.activeIndex - 2 + globalIndex + this.devsArray.length) % this.devsArray.length;
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
  
}
