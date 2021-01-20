import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {Router} from '@angular/router';
import {FriendService, UserService} from '../../shared/services';
import {FriendRequestModel} from '../../shared/models/friend-request.model';
import {FriendRequestsService} from '../../shared/services/friend-requests.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = new Array<Subscription>();
  requests: BasicUserModel[];
  user: BasicUserModel;

  constructor(private router: Router,
              private userService: UserService,
              private friendService: FriendService,
              private friendRequestsService: FriendRequestsService) {
    const user = this.userService.getUserDetails();
    if (user == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.user = this.userService.getBasicUserDetails();
    this.getFriendRequests();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  getFriendRequests(): void {
    this.subscriptions.push(
      this.friendRequestsService.getFriendRequests(this.user.uid).subscribe((requestsList: FriendRequestModel[]) => {
        this.requests = [];
        for (const req of requestsList) {
          this.friendService.getFriendInfo(req.fromId).subscribe((basicUserModel) => {
            this.requests.push(basicUserModel);
          });
        }
      }));
  }

  acceptRequest = (id: string) => {
    this.subscriptions.push(
      this.friendRequestsService.acceptRequest(this.user.uid, id).subscribe(() =>
        this.getFriendRequests()
      ));
  }

  refuseRequest = (id: string) => {
    this.subscriptions.push(
      this.friendRequestsService.refuseRequest(this.user.uid, id).subscribe(() =>
        this.getFriendRequests()
      ));
  }

  redirectToProfile = (id: string) => {
    this.router.navigate(['/home', id]);
  }
}
