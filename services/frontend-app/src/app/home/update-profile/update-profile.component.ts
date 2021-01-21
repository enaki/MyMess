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
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SnakbarService} from '../../shared/services/snakbar.service';
import {FormValidatorsService} from '../../shared/services/form-validators.service';

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
  private newProfileImage: File;

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly updateProfileService: UpdateProfileService,
      private readonly homeService: HomeService,
      private readonly snackBar: MatSnackBar,
      private readonly navigatorRoute: Router,
      private readonly snackBarService: SnakbarService,
      private readonly validatorsCustom: FormValidatorsService
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
          Validators.maxLength(60)
        ]
      ],
      tempPassword: [
        '',
        [
          this.validatorsCustom.matchValidator.bind(this)
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
    this.validatorsCustom.setUserProfileGroup(this.updateUserProfile);
    this.snackBarService.setSnackBar(this.snackBar);
  }

  ngOnInit(): void {
    this.subs.push(
        this.homeService.getUserProfileData(this.userId).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200){
            this.userProfileData = this.homeService.capitalizeKeys(response.body);
            this.updateProfileService.userProfileData = Object.assign({}, this.userProfileData);
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
            this.updateProfileService.userData = Object.assign({}, this.userData);
            this.profileLoaded = Promise.resolve(true);
          }
        }));
  }

  public isInvalid(form: AbstractControl): boolean {
    return form.invalid && (form.touched || form.dirty);
  }

  public updateUserData(): void {
    if (!this.updateUserProfile.get('tempPassword').valid && this.updateUserProfile.get('tempPassword').value !== ''){
      this.snackBarService.openSnackBar('Passwords don\'t match!', 'Ok');
      return;
    }
    const tmp = this.updateProfileService.removePristineFields(this.updateUserProfile.getRawValue());
    let changePassword = false;
    delete tmp.tempPassword;
    if ('passwordHash' in tmp){
      changePassword = true;
    }
    const data: UpdateUserProfile = tmp;
    this.updateProfileService.putUserProfileUpdate(JSON.parse(sessionStorage.getItem('user')).uid, data).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 204){
            if (!changePassword){
              this.snackBarService.openSnackBar('Updated profile successfully!', 'Ok');
            }
            else{
              this.snackBarService.openSnackBar('Updated profile successfully! Password has changed! Redirect after 3 seconds.', 'Ok');
              setTimeout(() => {this.navigatorRoute.navigate(['authentication']).then(r => {}); }, 3000);
            }
          }else {
            this.snackBarService.openSnackBar('Profile not updated! There was an error!', 'Ok');
          }
        });
  }

  public changeProfilePicture(fileInputEvent: any): void{
    this.newProfileImage = fileInputEvent.target.files[0];
    console.log(this.newProfileImage);
    this.updateProfileService.postUserProfilePicture(this.userId, this.newProfileImage).subscribe((response: HttpResponse<any>) => {
      console.log(response);
      if (response.status === 200) {
        this.snackBarService.openSnackBar('Updated profile picture successfully! Refreshing data.', 'Ok');
        setTimeout(() => { window.location.reload(); }, 3000);
      }
      else{
        this.snackBarService.openSnackBar('Failed to update profile picture!', 'Ok');
      }
    });

  }

  ngOnDestroy(): void {
    this.subs.forEach( (sub) => {
      sub.unsubscribe();
    });
  }
}
