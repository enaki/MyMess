import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {FriendListModel} from '../../shared/models/friend-list.model';
import {BasicUserModel} from '../../shared/models/basic-user.model';

// MDB Angular Free

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  contacts: BasicUserModel[];
  currentSelected: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private friendService: FriendService
  ) {
    const user = this.userService.getUserDetails();
    if (user == null) {
      // this.router.navigate(['auth']);
    }
  }

  ngOnInit(): void {
    this.friendService.getFriendsIds('3').subscribe((data: FriendListModel) => {
      this.contacts = [];
      for (const friendId of data.friendList) {
        this.friendService.getFriendInfo(friendId).subscribe((basicUserModel: BasicUserModel) => {
          console.log(basicUserModel);
          this.contacts.push(basicUserModel);
        });
      }
    });
  }

  changeChat(id: string): void {
    this.currentSelected = parseInt(id);
  }
}
