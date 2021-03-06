import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../services/header.service';
import {UserService} from '../services';
import {SocketService} from '../services/socket.service';
import {Socket} from 'socket.io-client';
import {Subscription} from 'rxjs';
import {FriendRequestsService} from "../services/friend-requests.service";


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
  isInInbox = false;

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private socketService: SocketService,
    private friendRequestsService: FriendRequestsService
  ) {
    this.subs = new Array<Subscription>();
    this.subs.push(this.socketService.socket.subscribe((socket) => {
      this.socket = socket;
      if (socket != null) {
        this.socketHandler();
      }
    }));
    this.showInboxNotification = false;
    this.isInInbox = true;
  }

  // public ngOnInit() {
  //   this.subs.push(
  //   this.headerService.getRouter().events.subscribe((val) => {
  //     try {
  //       this.friendRequestsService.getFriendRequests(JSON.parse(sessionStorage.getItem('user')).uid).toPromise().then((data) => {
  //         if (data.length > 0) {
  //           this.showNotifications = true;
  //         }
  //       });
  //     } catch (e) {
  //       this.showNotifications = false;
  //     }
  //   }));
  // }

  socketHandler(): void {
    this.socket.on('notify-inbox', (data: any) => {
      if (!this.isInInbox) {
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
    this.isInInbox = true;
    this.headerService.navigateToInbox();
  }

  public goToHomePage(): void {
    this.isInInbox = false;
    this.headerService.navigateToHome();
  }

  public goToNotificationPage(): void {
    this.isInInbox = false;
    this.showNotifications = false;
    this.headerService.navigateToNotification();
  }

  public goToFriendsPage(): void {
    this.isInInbox = false;
    this.headerService.navigateToFriends();
  }

  public goToPeoplePage(): void {
    this.isInInbox = false;
    this.headerService.navigateToPeople();
  }

  public goToLoginPage(): void {
    this.isInInbox = false;
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
