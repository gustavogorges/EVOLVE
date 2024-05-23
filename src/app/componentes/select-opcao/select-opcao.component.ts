import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/model/propriedade/option';
import { Property } from 'src/model/propriedade/property';
import { PropertyType } from 'src/model/propriedade/propertyType';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { CookiesService } from 'src/service/cookies-service.service';

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

  @Input()
  task : Task = new Task;

  @Output() newItem = new EventEmitter<boolean>();

  optionsList : Array<Option> = new Array;
  loggedUser : User = new User;

  constructor(
    private service : BackendEVOLVEService,
    private cookies_service : CookiesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.optionsList = this.property.options;
    this.loggedUser = await this.cookies_service.getLoggedUser().then((user)=>{return user})
  }

  async saveOptionUniSelect(option:Option) {
    if(this.property.propertyType.toString() == "UniSelectValue") {
      this.property.currentOptions = [];
      this.property.currentOptions.push(option);
      this.property = await this.service.updatePropertyOptions(this.task.id, this.loggedUser.id, this.property.id, this.property.currentOptions);
      this.newItem.emit(true);
    }
  }

  async saveOptionMultiSelect(option:Option) {
     if (!this.verifyIfCurrentOptionExists(option)) {
      this.property.currentOptions.push(option);
      this.property = await this.service.updatePropertyOptions(this.task.id, this.loggedUser.id, this.property.id, this.property.currentOptions);
    }
  }

  async removeOptionMultiSelect(option:Option) {
    if (this.verifyIfCurrentOptionExists(option)) {
      this.property.currentOptions.forEach(elementFor => {
        if(elementFor.id == option.id) {
          const index:number =  this.property.currentOptions.indexOf(elementFor);
          this.property.currentOptions.splice(index,1)
        }
      });
    }
    this.property = await this.service.updatePropertyOptions(this.task.id, this.loggedUser.id, this.property.id, this.property.currentOptions);
  }

  async excludeOptionMultiSelect(option:Option) {
    if(this.verifyIfOptionExists(option)) {
      this.removeOptionMultiSelect(option);
      this.property.options.forEach(async optionFor => {
        if(optionFor.id == option.id) {
          const index: number = this.property.options.indexOf(optionFor);
          this.property.options.splice(index,1);
          this.property = await this.service.deletePropertyOption(option.id, this.loggedUser.id, this.task.id, this.property.id);
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
    const newOption:Option = await this.service.putPropertyOption(this.option, this.loggedUser.id, this.task.id, this.property.id);
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
