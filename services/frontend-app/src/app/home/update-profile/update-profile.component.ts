import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {UpdateProfileService} from '../services/update-profile.service';
import {CountryModel} from '../../authentication/models/country.model';
import {HomeService} from '../services/home.service';
import {UserModel} from '../models/user.model';
import {Subscription} from 'rxjs';
import {UserProfileModel} from '../models/userprofile.model';
import {UpdateUserProfile} from '../models/updateuserprofile';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  public updateUserProfile: FormGroup;
  public countries: Array<CountryModel>;
  public countriesLoaded: Promise<boolean>;
  public profileLoaded: Promise<boolean>;
  public userProfileLoaded: Promise<boolean>;
  public hide = true;
  public userId = JSON.parse(sessionStorage.getItem('user')).uid;
  public userData: UserModel;
  public userProfileData: UserProfileModel;
  private subs: Subscription[];

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly updateProfileService: UpdateProfileService,
      private readonly homeService: HomeService
  ) {
    this.subs = new Array<Subscription>();
    this.countries = new Array<CountryModel>();
    this.updateUserProfile = this.formBuilder.group({
      username: [
        '',
        [
          Validators.maxLength(150),
          Validators.minLength(3)
        ]
      ],
      passwordHash: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        ]
      ],
      tempPassword: [
        '',
        [
          this.matchValidator.bind(this)
        ]
      ],
      email: [
        '',
        [
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      firstName: [
        '',
        [
          Validators.maxLength(50),
          Validators.minLength(3)
        ]
      ],
      lastName: [
        '',
        [
          Validators.maxLength(50),
          Validators.minLength(3)
        ]
      ],
      birthdate: [
        '',
      ],
      gender: [
        '',
      ],
      country: [
        '',
      ],
      city: [
        '',
      ]
    });
  }

  ngOnInit(): void {
    this.subs.push(
        this.homeService.getUserProfileData(this.userId).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200){
            this.userProfileData = this.homeService.capitalizeKeys(response.body);
            this.userProfileLoaded = Promise.resolve(true);
          }
        }));
    this.subs.push(
        this.updateProfileService.getCountriesAndCities().subscribe((response: HttpResponse<any>) => {
          if (response.status === 200){
            this.countries = response.body.data;
            this.countriesLoaded = Promise.resolve(true);
          }
        }));
    this.subs.push(
        this.homeService.getUserData(this.userId).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200){
            this.userData = this.homeService.capitalizeKeys(response.body);
            this.profileLoaded = Promise.resolve(true);
          }
        }));
  }

  public matchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fromValue = control.value;
    if (this.updateUserProfile) {
      const toValue = (this.updateUserProfile.get('passwordHash') as FormGroup).value;
      if (fromValue && toValue && fromValue === toValue) {
        return null;
      }
      return { fieldMatch : true };
    }
  }

  public isInvalid(form: AbstractControl): boolean {
    return form.invalid && (form.touched || form.dirty);
  }

  public updateUserData(): void {
    const tmp = this.updateUserProfile.getRawValue();
    delete tmp.tempPassword;
    const data: UpdateUserProfile = tmp;
    this.updateProfileService.postUserProfileUpdate(JSON.parse(sessionStorage.getItem('user')).uid, data).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
        });
  }

  ngOnDestroy(): void {
    this.subs.forEach( (sub) => {
      sub.unsubscribe();
    });
  }
}
