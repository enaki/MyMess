import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from '../services/home.service';
import {Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {UserProfileModel} from '../models/userprofile.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    constructor(
        private readonly homeService: HomeService,
        private readonly route: ActivatedRoute,
        private readonly navigatorRoute: Router
    ) {
        this.subs = new Array<Subscription>();
        this.userData = null;
        this.userProfileData = null;
    }
    private subs: Subscription[];
    public userData: UserModel;
    public userProfileData: UserProfileModel;
    public loadedProfile: Promise<boolean>;
    public loadedProfileInfo: Promise<boolean>;
    public userId: string;
    public loggedUserId: string;

    ngOnInit(): void {
        this.loggedUserId = JSON.parse(sessionStorage.getItem('user')).uid;
        const tmp = this.route.snapshot.paramMap;
        this.userId = tmp.get('userUid') !== null ? tmp.get('userUid') : JSON.parse(sessionStorage.getItem('user')).uid;
        this.subs.push(
            this.homeService
                .getUserData(this.userId)
                .subscribe(
                    (response: HttpResponse<any>) => {
                        if (response.status === 200){
                            this.userData = this.homeService.capitalizeKeys(response.body);
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
                .getUserProfileData(this.userId)
                .subscribe(
                    (response: HttpResponse<any>) => {
                        if (response.status === 200){
                            this.userProfileData = this.homeService.capitalizeKeys(response.body);
                            this.loadedProfileInfo = Promise.resolve(true);
                        }
                        if (response.status / 100 === 4){
                            console.log(response.body);
                        }
                    }
                )
        );
    }

    public goToUpdateProfile(): void{
        this.navigatorRoute.navigate(['home/update-profile']).then(r => {console.log('Redirected to update-profile page.'); });
    }

    ngOnDestroy(): void {
        this.subs.forEach( (sub) => {
            sub.unsubscribe();
        });
    }
}
