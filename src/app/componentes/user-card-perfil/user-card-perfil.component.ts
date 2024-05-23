import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/model/user';

@Component({
  selector: 'app-user-card-perfil',
  templateUrl: './user-card-perfil.component.html',
  styleUrls: ['./user-card-perfil.component.scss']
})
export class UserCardPerfilComponent implements OnInit {

  constructor() { }

  @Input()
  user !: User

  ngOnInit(): void {

  }
  getUserStyles(user: any): any {
    let styles: any = {};
    
    if(user.image!=null){
      styles['background'] ="data:image/jpeg;base64,"+ user.image?.data;
    }else{
      styles['background-color'] = user.imageColor;

    }

    // getUserStyles(user) 

    
    
    
    return styles
  }

}
