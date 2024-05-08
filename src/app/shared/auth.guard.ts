import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/service/autService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service :AuthService, private route :Router){}
  canActivate(){
   if(this.service.isLoggedIn()){
    return true;
   }else{
    
    this.route.navigate([''])
    return false;
   }
  }
  
}
