import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services';
import {FriendRequestsService} from '../../shared/services/friend-requests.service';
import {PeopleService} from '../services/people.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = new Array<Subscription>();
  people: BasicUserModel[];
  searchText: string;
  user: BasicUserModel;

  constructor(private router: Router,
              private userService: UserService,
              private friendRequestService: FriendRequestsService,
              private peopleService: PeopleService) {
    const user = this.userService.getUserDetails();
    if (user == null) {
      this.router.navigate(['login']);
    }
  }

  getPeople(): void {
    this.subscriptions.push(
      this.peopleService.getPeople(this.user.uid).subscribe((peopleList: BasicUserModel[]) => {
        this.people = peopleList;
      }));
  }

  ngOnInit(): void {
    this.user = this.userService.getBasicUserDetails();
    this.getPeople();
    this.searchText = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  sendRequest = (id: string) => {
    this.subscriptions.push(
      this.friendRequestService.sendRequest(this.user.uid, id).subscribe(() =>
        this.getPeople()
      ));
  }

  redirectToProfile = (id: string) => {
    this.router.navigate(['/home', id]);
  }
}
