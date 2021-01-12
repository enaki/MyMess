import {Component, OnInit} from '@angular/core';

import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {FriendRequestsService} from "../../shared/services/friend-requests.service";

@Component({
  selector: 'app-friends-add',
  templateUrl: './friends-add.component.html',
  styleUrls: ['./friends-add.component.css']
})

export class AddFriendsComponent implements OnInit {
  people: BasicUserModel[];
  searchText: string;
  uid = '3'; // TODO: replace with user uid

  constructor(private router: Router,
              private userService: UserService,
              private friendService: FriendService,
              private friendRequestService: FriendRequestsService) {
    // const user = this.userService.getUserDetails();
    // if (user == null) {
    //   this.router.navigate(['login']);
    // }
  }

  getPeople(): void {
    this.friendService.getAllUsers().subscribe((peopleList: BasicUserModel[]) => {
      this.people = peopleList;
    });
  }

  ngOnInit(): void {
    this.getPeople();
    this.searchText = '';
  }

  sendRequest = (id: string) => {
    this.friendRequestService.sendRequest(this.uid, id).subscribe(() =>
      this.getPeople()
    );
  }

  redirectToProfile = (id: string) => {
    this.router.navigate(['/profile']);
  }
}


