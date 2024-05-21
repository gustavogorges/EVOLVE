import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-green-div-landingpage',
  templateUrl: './green-div-landingpage.component.html',
  styleUrls: ['./green-div-landingpage.component.scss']
})
export class GreenDivLandingpageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
