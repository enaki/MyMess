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
    this.router.navigate(['']).then(r => {});
  }

  public navigateToFriends(): void{
    this.router.navigate(['friends']).then(r => {});
  }

  public navigateToProfile(): void{
    this.router.navigate(['profile']).then(r => {});
  }

  public navigateToLogin(): void{
    this.router.navigate(['login']).then(r => {});
  }

  public navigateToNotification(): void{
    this.router.navigate(['notifications']).then(r => {});
  }
}
