import {Component, OnInit} from '@angular/core';

import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {FriendListModel} from '../../shared/models/friend-list.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit {
  friends: BasicUserModel[];
  searchText: string;
  uid = '3'; // TODO: replace with user uid

  constructor(private router: Router, private userService: UserService, private friendService: FriendService) {
    // const user = this.userService.getUserDetails();
    // if (user == null) {
    //   this.router.navigate(['login']);
    // }
  }

  getFriends(): void {
    this.friendService.getFriendsIds(this.uid).subscribe((data: FriendListModel) => {
      this.friends = [];
      for (const friendId of data.friendList) {
        this.friendService.getFriendInfo(friendId).subscribe((basicUserModel) => {
          this.friends.push(basicUserModel);
        });
      }
    });
  }

  ngOnInit(): void {
    this.getFriends();
    this.searchText = '';
  }

  blockFriend = (name: string, id: string) => {
    if (confirm(`Are you sure you want to block ${name}?`)) {
      this.friendService.blockFriend(this.uid, id).subscribe(() =>
        this.getFriends()
      );
    }
  };

  deleteFriend = (name: string, id: string) => {
    if (confirm(`Are you sure to remove ${name} as your friend?`)) {
      this.friendService.deleteFriend(this.uid, id).subscribe(() =>
        this.getFriends()
      );
    }
  };

  redirectToProfile = (id: string) => {
    // TODO: redirect to friend profile
    this.router.navigate(['/profile']);
  };

  redirectToAddFriends = () => {
    this.router.navigate(['friends/find']);
  }
}
