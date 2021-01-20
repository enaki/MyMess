import {Component, OnDestroy, OnInit} from '@angular/core';

import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {FriendListModel} from '../../shared/models/friend-list.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = new Array<Subscription>();
  friends: BasicUserModel[];
  user: BasicUserModel;
  searchText: string;

  constructor(private router: Router, private userService: UserService, private friendService: FriendService) {
    const user = this.userService.getUserDetails();
    if (user == null) {
      this.router.navigate(['login']);
    }
  }

  getFriends(): void {
    this.subscriptions.push(
      this.friendService.getFriendsIds(this.user.uid).subscribe((data: FriendListModel) => {
        this.friends = [];
        for (const friendId of data.friendList) {
          this.friendService.getFriendInfo(friendId).subscribe((basicUserModel) => {
            this.friends.push(basicUserModel);
          });
        }
      }));
  }

  ngOnInit(): void {
    this.user = this.userService.getBasicUserDetails();
    this.getFriends();
    this.searchText = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  blockFriend = (name: string, id: string) => {
    if (confirm(`Are you sure you want to block ${name}?`)) {
      this.subscriptions.push(
        this.friendService.blockFriend(this.user.uid, id).subscribe(() =>
          this.getFriends()
        ));
    }
  }

  deleteFriend = (name: string, id: string) => {
    if (confirm(`Are you sure to remove ${name} as your friend?`)) {
      this.subscriptions.push(
        this.friendService.deleteFriend(this.user.uid, id).subscribe(() =>
          this.getFriends()
        ));
    }
  }

  redirectToProfile = (id: string) => {
    this.router.navigate(['/home', id]);
  }

}
