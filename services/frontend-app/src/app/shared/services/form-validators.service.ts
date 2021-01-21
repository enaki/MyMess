import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorsService {
  private updateUserProfile: FormGroup;
  constructor() { }

  public matchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    console.log('Validator user form' + this.updateUserProfile);
    const fromValue = control.value;
    if (this.updateUserProfile) {
      const toValue = (this.updateUserProfile.get('passwordHash') as FormGroup).value;
      if (fromValue && toValue && fromValue === toValue) {
        return null;
      }
      return { fieldMatch : true };
    }
  }

  public setUserProfileGroup(userProfile: FormGroup): void{
    this.updateUserProfile = userProfile;
    console.log('Set user form');
    console.log(this.updateUserProfile);
  }
}
