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
    this.optionsList = this.property.options;
  }

  saveOptionUniSelect(option:Option) {
    if(this.property.propertyType.toString() == "UniSelectValue") {
      this.property.currentOptions = [];
      this.property.currentOptions.push(option);
      this.newItem.emit();
    }
  }

  saveOptionMultiSelect(option:Option) {
     if (!this.verifyIfCurrentOptionExists(option)) {
      this.property.currentOptions.push(option);
    }
  }

  removeOptionMultiSelect(option:Option) {
    if (this.verifyIfCurrentOptionExists(option)) {
      this.property.currentOptions.forEach(elementFor => {
        if(elementFor.id == option.id) {
          const index:number =  this.property.currentOptions.indexOf(elementFor);
          this.property.currentOptions.splice(index,1)
        }
      });
    }
  }

  excludeOptionMultiSelect(option:Option) {
    if(this.verifyIfOptionExists(option)) {
      this.removeOptionMultiSelect(option);
      this.property.options.forEach(optionFor => {
        if(optionFor.id == option.id) {
          const index: number = this.property.options.indexOf(optionFor);
          this.property.options.splice(index,1);
        }
      })
    }
  }

  verifyIfCurrentOptionExists(option:Option) : boolean {
    return this.property.currentOptions.some(optionFind => optionFind.id == option.id);
  }

  verifyIfOptionExists(option:Option) : boolean {
    return this.property.options.some(optionFind => optionFind.id == option.id);
  }

  addOption() {
    this.booleanAddOption = !this.booleanAddOption;
  }

  async newOption(): Promise<void> {
    const newOption:Option = await this.service.putPropertyOption(this.option);
    this.property.options.push(newOption);
    this.addOption();
  }

  checkTypeAndBoolean() : boolean {
      if(this.property.propertyType.toString() == "MultiSelectValue") {
        return true;
      } else  {
        return false;
      }
    
  }
}
