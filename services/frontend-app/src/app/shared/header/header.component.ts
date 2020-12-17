import { Component} from '@angular/core';
import {HeaderService} from '../services/header.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private headerService: HeaderService,
    private userService: UserService
  ) { }

  public goToInboxPage(): void{
    this.headerService.navigateToInbox();
  }

  public goToHomePage(): void{
    this.headerService.navigateToHome();
  }

  public goToNotificationPage(): void{
    this.headerService.navigateToNotification();
  }

  public goToFriendsPage(): void{
    this.headerService.navigateToFriends();
  }

  public goToProfilePage(): void{
    this.headerService.navigateToProfile();
  }

  public goToLoginPage(): void{
    this.headerService.navigateToLogin();
  }

  /**
   * Metoda verifica daca userul este logat.
   */
  public isUserLoggedIn(): boolean {
   return this.userService.getUserName() != null;
  }

  // TODO - trebuie implementata o metoda de login cu ajutorul jwt
  public logout(): void{

  }
}
