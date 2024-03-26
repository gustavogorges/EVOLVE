import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/model/propriedade/option';
import { Property } from 'src/model/propriedade/property';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { Task } from 'src/model/task';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';

@Component({
  selector: 'app-select-opcao',
  templateUrl: './select-opcao.component.html',
  styleUrls: ['./select-opcao.component.scss']
})
export class SelectOpcaoComponent implements OnInit {

  booleanAddOption : boolean = false;
  booleanTeste : boolean = false;
  color : string = "";

  option : Option = new Option;

  @Input()
  property : Property = new Property;

  @Output() newItem = new EventEmitter<boolean>();

  optionsList : Array<Option> = new Array;

  constructor(
    private service : BackendEVOLVEService
  ) { }

  ngOnInit(): void {
    console.log(this.property);
    this.optionsList = this.property.options;
  }

  salvarOption(option:Option) {

    if(this.property.propertyType.toString() == "UniSelectValue") {
      this.property.currentOptions = [];
      this.property.currentOptions.push(option);
    } else if (this.property.propertyType.toString() == "MultiSelectValue") {
      this.property.currentOptions.push(option);
    }
    
    this.newItem.emit();
  }

  addOption() {
    this.booleanAddOption = !this.booleanAddOption;
  }

  async novaOption(): Promise<void> {
    this.property.options.push(this.option);
    this.addOption();
  }
}
