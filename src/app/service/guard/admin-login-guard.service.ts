import { LoginService } from '../login.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate, CanActivateChild } from '@angular/router/src/interfaces';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Router } from '@angular/router';

@Injectable()
export class AdminLoginGuard implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (localStorage.getItem('isLogin') === 'yes') {
      return true;
    }
    else{
    this.router.navigate(['/login']);
    return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  // checkLogin(): Observable<boolean> | boolean {
  //   if (localStorage.getItem('isLogin') === 'yes') {
  //     return true;
  //   }
  //   else{
  //   this.router.navigate(['/login']);
  //   return false;
  //   }
  // }

}