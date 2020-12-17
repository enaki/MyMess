import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private helper: JwtHelperService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {
    const userToken = sessionStorage.getItem('userToken');
    /*
    if (userToken === undefined) {
      this.router.navigate(['authentication']).then(r => {console.log('User redirected'); });
      return false;
    }
    if (this.helper.isTokenExpired(userToken)) {
      this.router.navigate(['authentication']).then(r => {console.log('User redirected'); });
      return false;
    }
    */
    return true;
  }

}
