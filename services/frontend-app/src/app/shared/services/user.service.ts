import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUserName(): void {
    let username = null;
    if (sessionStorage.getItem('identity') != null) {
      username = JSON.parse(
        sessionStorage.getItem('identity')
      ).username;
    }
    return username;
  }
}
