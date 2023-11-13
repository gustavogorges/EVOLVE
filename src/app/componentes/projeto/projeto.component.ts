import { Component, HostListener, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  revela:boolean = false
  tamanhoTela:Number = 0
  md: boolean = false

  resizeObservable?: Observable<Event>
  resizeSubscription ?: Subscription

  constructor() { }

  ngOnInit(): void {
    this.resizeObservable = fromEvent(window, 'resize')
    this.resizeSubscription = this.resizeObservable.subscribe( e => {
      this.getScreenSize()
      this.revela = false
    })
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe
  }

  revelaInfos(){
    this.revela = !this.revela
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if(window.innerWidth < 768){
      this.md = true
    }else{
      this.md = false
    }
  }

  setRevela(param:boolean):void{
    this.revela = param
  }
}
