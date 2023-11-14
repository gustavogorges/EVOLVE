import { Component, HostListener, Input, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { projetoService } from 'src/service/projetoService';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  @Input() isVisible:boolean = true;

  tamanhoTela:Number = 0
  md: boolean = false
  revela: boolean = false

  resizeObservable?: Observable<Event>
  resizeSubscription ?: Subscription

  constructor(private revelaService : projetoService) { }

  ngOnInit(): void {
    this.getScreenSize()
    this.resizeObservable = fromEvent(window, 'resize')
    this.resizeSubscription = this.resizeObservable.subscribe( e => {
      this.revelaService.setRevela(false)
    })
    this.revela = this.revelaService.getRevela()
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe
  }

  revelaInfos(){
    this.revelaService.setRevela(!this.revelaService.getRevela())
    this.revela = this.revelaService.getRevela()
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if(window.innerWidth < 768){
      this.md = true
    }else{
      this.md = false
    }
  }
}
