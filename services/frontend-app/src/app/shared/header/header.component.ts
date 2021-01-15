import {Component, OnDestroy} from '@angular/core';
import {HeaderService} from '../services/header.service';
import {UserService} from '../services';
import {SocketService} from '../services/socket.service';
import {Socket} from 'socket.io-client';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  socket: Socket;
  private subs: Subscription[];
  showInboxNotification = true;
  showNotifications = false;

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private socketService: SocketService
  ) {
    this.subs = new Array<Subscription>();
    this.subs.push(this.socketService.socket.subscribe((socket) => {
      this.socket = socket;
      if (socket != null) {
        this.socketHandler();
      }
    }));
    this.showInboxNotification = false;
  }

  socketHandler(): void {
    this.socket.on('message-notifications', (data: any) => {
      console.log('Unseen messages from.');
      console.log(data);
      if (data.length > 0) {
        this.showInboxNotification = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  public goToInboxPage(): void {
    this.showInboxNotification = false;
    this.headerService.navigateToInbox();
  }

  public goToHomePage(): void {
    this.headerService.navigateToHome();
  }

  public goToNotificationPage(): void {
    this.headerService.navigateToNotification();
  }

  public goToFriendsPage(): void {
    this.headerService.navigateToFriends();
  }

  public goToProfilePage(): void {
    this.headerService.navigateToProfile();
  }

  public goToLoginPage(): void {
    this.headerService.navigateToLogin();
  }

  /**
   * Metoda verifica daca userul este logat.
   */
  public isUserLoggedIn(): boolean {
    return this.userService.getUserName() != null;
  }

  // TODO - trebuie implementata o metoda de login cu ajutorul jwt
  public logout(): void {
    this.socketService.setupSocketDisconnect();
    this.userService.sessionStorageCleaning();
    this.headerService.navigateToLogin();
  }
}
