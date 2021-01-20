import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private router: Router
  ) { }

  public navigateToInbox(): void{
    this.router.navigate(['inbox']).then(r => {});
  }

  public navigateToHome(): void{
    this.router.navigate(['home']).then(r => {});
  }

  public navigateToFriends(): void{
    this.router.navigate(['friends']).then(r => {});
  }

  public navigateToPeople(): void{
    this.router.navigate(['people']).then(r => {});
  }

  public navigateToLogin(): void{
    this.router.navigate(['authentication']).then(r => {});
  }

  public navigateToNotification(): void{
    this.router.navigate(['notifications']).then(r => {});
  }
  public getRouter(): Router{
    return this.router;
  }
}
