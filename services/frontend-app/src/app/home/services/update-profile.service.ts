import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {UserProfileModel} from '../models/userprofile.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  public userData: UserModel;
  public userProfileData: UserProfileModel;

  constructor(
      private readonly httpClient: HttpClient
  ) {
  }

  private filterKeys(data: any, toFilterData: any): any{
    Object.keys(data).forEach(
        (item) => {
          const tempKey = item.charAt(0).toLowerCase() + item.slice(1);
          if (tempKey in toFilterData){
            if (toFilterData[tempKey] === data[item] || toFilterData[tempKey] === ''){
              delete toFilterData[tempKey];
            }
          }
        }
    );
    if (toFilterData.passwordHash === '') {
      delete toFilterData.passwordHash;
    }
    return toFilterData;
  }

  public removePristineFields(rawValue: any): any {
    const tmp1 = this.filterKeys(this.userData, rawValue);
    const tmp2 = this.filterKeys(this.userProfileData, rawValue);
    return Object.assign({}, tmp1, tmp2);
  }

  public putUserProfileUpdate(id: string, data: any): Observable<HttpResponse<unknown>>{
    return this.httpClient.put(
        `api/users/${id}`,
        data,
        {observe: 'response'}
    );
  }

  public getCountriesAndCities(): Observable<HttpResponse<unknown>>{
    return this.httpClient.get(
        'https://countriesnow.space/api/v0.1/countries',
        {observe: 'response'}
    );
  }

  public postUserProfilePicture(id: string, photo: File): Observable<HttpResponse<unknown>>{
    return this.httpClient.post(
        `/api/images/${id}`,
        photo,
        {observe: 'response'}
    );
  }
}
