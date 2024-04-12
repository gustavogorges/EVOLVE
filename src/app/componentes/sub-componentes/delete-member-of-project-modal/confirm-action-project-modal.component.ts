import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'confirm-action-project-modal',
  templateUrl: './confirm-action-project-modal.component.html'
})
export class ConfirmActionProjectModalComponent implements OnInit, OnDestroy {
  @Input() quest!: string;
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  time: number = 10;
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.startTimer()
  }

  ngOnDestroy(): void {
    this.clearInterval();
    setTimeout(() => {
      this.result.emit(false);
    }, 10)
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        this.clearInterval();
        this.result.emit(false);
      }
    }, 1000);
  }

  clearInterval(): void {
    clearInterval(this.interval);
  }

  confirm(): void {
    this.clearInterval();
    this.result.emit(true);
  }

  cancel(): void {
    this.clearInterval();
    this.result.emit(false);
  }
}
