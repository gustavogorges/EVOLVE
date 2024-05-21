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
    setInterval(async () => {
        await this.slideNext();
    }, 15000);
}

async slide(index: number): Promise<void> {
    this.indexSlide = index;
    await this.wait(30000);
}

private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

private async slideNext(): Promise<void> {
    this.indexSlide = (this.indexSlide + 1) % 4;
    await this.wait(10000);
}

}
