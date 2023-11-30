import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-propriedade',
  templateUrl: './select-propriedade.component.html',
  styleUrls: ['./select-propriedade.component.scss']
})
export class SelectPropriedadeComponent implements OnInit {

  booleanClickDate : boolean = false;
  booleanClickUniqueSelection : boolean = false;
  booleanClickDouble : boolean = false;
  booleanClickInteger : boolean = false;
  booleanClickMultiSelection : boolean = false;
  booleanClickText : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickDate() {
    this.booleanClickDate = !this.booleanClickDate;
  }
  clickUniqueSelection() {
    this.booleanClickUniqueSelection = !this.booleanClickUniqueSelection;
  }
  clickDouble() {
    this.booleanClickDouble = !this.booleanClickDouble;
  }
  clickInteger() {
    this.booleanClickInteger = !this.booleanClickInteger;
  }
  clickMultiSelection() {
    this.booleanClickMultiSelection = !this.booleanClickMultiSelection;
  }
  clickText() {
    this.booleanClickText = !this.booleanClickText;
  }

}
