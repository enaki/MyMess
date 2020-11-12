import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login = false;

  constructor() { }

  checkLogin() {
    //some checks
    this.login = true;
  }
  isLoggedIn(){
    return this.login;
  }
}
