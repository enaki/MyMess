import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from '../services/home.service';
import {Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {UserProfileModel} from '../models/userprofile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
      private readonly homeService: HomeService
  ) {
    this.subs = new Array<Subscription>();
    this.subs.push(
        this.homeService
            .getUserData()
            .subscribe(
                (response: HttpResponse<any>) => {
                  if (response.status === 200){
                    this.userData = response.body;
                    this.loadedProfile = Promise.resolve(true);
                  }
                  if (response.status / 100 === 4){
                    console.log(response.body);
                  }
                }
            )
    );
    this.subs.push(
        this.homeService
            .getUserProfileData()
            .subscribe(
                (response: HttpResponse<any>) => {
                  if (response.status === 200){
                    this.userProfileData = response.body;
                    this.loadedProfileInfo = Promise.resolve(true);
                  }
                  if (response.status / 100 === 4){
                    console.log(response.body);
                  }
                }
            )
    );
  }
  private subs: Subscription[];
  public userData: UserModel;
  public userProfileData: UserProfileModel;
  public loadedProfile: Promise<boolean>;
  public loadedProfileInfo: Promise<boolean>;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach( (sub) => {
      sub.unsubscribe();
    });
  }
}
