import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/service/autService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service :AuthService, private router :Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    console.log(state.url);
    
    if (this.service.isLoggedIn()) {
      console.log(state.url);
      
      // Se estiver logado e tentar acessar a página de login ou de cadastro, redireciona para a página inicial
      if ((state.url == '/tela-cadastro') || state.url==('/')) {
        this.router.navigate(['/tela-inicial']);
        return false; // Retorna falso para bloquear a navegação para as páginas de login e cadastro
      }
    } else {
      // Se não estiver logado e tentar acessar outras páginas além de login e cadastro, redireciona para a página de login
      if (state.url!='/tela-cadastro' && state.url!='/') {
        this.router.navigate(['/']);
        return false; // Retorna falso para bloquear a navegação para outras páginas além de login e cadastro
      }
    }
    
    return true; // Permite a navegação para as páginas de login e cadastro se o usuário não estiver logado e para outras páginas se estiver logado
  }
  


  
}
