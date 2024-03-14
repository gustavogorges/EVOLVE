import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-view-interative-landing-page',
  templateUrl: './screen-view-interative-landing-page.component.html',
  styleUrls: ['./screen-view-interative-landing-page.component.scss']
})
export class ScreenViewInterativeLandingPageComponent implements OnInit {

  constructor() { }

  indexSlide:number = 0
  slideInterval: any;

  ngOnInit(): void {
    this.startSlideLoop();
  }

  startSlideLoop(): void {
    setInterval(() => {
      this.indexSlide = (this.indexSlide + 1) % 4;
    }, 5000);
  }

  slide(index:number){
    this.indexSlide = index
    setTimeout(() => {
    }, 10000)
  }
}
