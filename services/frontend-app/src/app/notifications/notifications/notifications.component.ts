import {Component, OnInit} from '@angular/core';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {Router} from '@angular/router';
import {FriendService, UserService} from '../../shared/services';
import {FriendRequestModel} from '../../shared/models/friend-request.model';
import {FriendRequestsService} from '../../shared/services/friend-requests.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  requests: BasicUserModel[];
  uid = '4'; // TODO: replace with user uid
  constructor(private router: Router,
              private userService: UserService,
              private friendService: FriendService,
              private friendRequestsService: FriendRequestsService) {
    // const user = this.userService.getUserDetails();
    // if (user == null) {
    //   this.router.navigate(['login']);
    // }
  }

  ngOnInit(): void {
    this.getFriendRequests();
  }

  getFriendRequests(): void {
    this.friendRequestsService.getFriendRequests(this.uid).subscribe((requestsList: FriendRequestModel[]) => {
      this.requests = [];
      for (const req of requestsList) {
        this.friendService.getFriendInfo(req.fromId).subscribe((basicUserModel) => {
          this.requests.push(basicUserModel);
        });
      }
    });
  }

  acceptRequest = (id: string) => {
    this.friendRequestsService.acceptRequest(this.uid, id).subscribe(() =>
      this.getFriendRequests()
    );
  }

  refuseRequest = (id: string) => {
    this.friendRequestsService.refuseRequest(this.uid, id).subscribe(() =>
      this.getFriendRequests()
    );
  }

  redirectToProfile = (id: string) => {
    // TODO: go to user profile
    this.router.navigate(['/home', id]);
  }
}
