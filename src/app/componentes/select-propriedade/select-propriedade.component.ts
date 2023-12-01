import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-propriedade',
  templateUrl: './select-propriedade.component.html',
  styleUrls: ['./select-propriedade.component.scss']
})
export class SelectPropriedadeComponent implements OnInit {

  propertieSelected : boolean = false;

  propertieSelectedName : string = "";

  constructor() { }

  ngOnInit(): void {
    console.log(this.options)
  }

  options: any[] = [
    { 
    text: "data", 
    icon: "pi pi-calendar", 
    hover:false,
    selected:false
    },
    { 
    text: "seleção única", 
    icon: "pi pi-tag", 
    hover:false,
    selected:false
    },
    { 
    text: "número double", 
    icon: "pi pi-dollar", 
    hover:false,
    selected:false
    },
    { 
    text: "numero inteiro",
    icon: "pi pi-hashtag", 
    hover:false,
    selected:false
    },
    { 
    text: "seleção múltipla", 
    icon: "pi pi-tags", 
    hover:false,
    selected:false
    },
    { 
    text: "text", 
    icon: "pi pi-book", 
    hover:false,
    selected:false 
    }
  ]

  clickDate(option:any) {
    this.options.forEach(option => {
      if(option.selected == true) {
        option.selected = false;
        option.hover = false;
      }
    });
    option.hover = true;
    option.selected = true;
    this.anySelected();
    console.log(this.propertieSelected)
  }

  anySelected() : void{

    this.options.forEach(option => {
      if(option.selected == true) {
        this.propertieSelected = true;
      }
    });
    
  }

}
