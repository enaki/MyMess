import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {FriendListModel} from '../../shared/models/friend-list.model';
// MDB Angular Free

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  contacts: any = [
    {
      name: 'Khalid',
      status: 'Khalid is online',
      image: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
      icon: 'online_icon'
    },
    {
      name: 'Taherah Big',
      status: 'Taherah left 7 mins ago',
      image: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
      icon: 'online_icon offline'
    },
    {
      name: 'Sami Rafi',
      status: 'Sami is online',
      image: 'https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg',
      icon: 'online_icon'
    },
    {
      name: 'Your Demon',
      status: 'Strugariu left 30 mins ago',
      image: 'http://math.etc.tuiasi.ro/rstrugariu/wp-content/uploads/2017/11/rstr-768x768.jpg',
      icon: 'online_icon offline'
    },
    {
      name: 'Rashid Samim',
      status: 'Strugariu left 50 mins ago',
      image: 'https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg',
      icon: 'online_icon offline'
    }
  ];

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
      console.log(data);
    });
  }

}
