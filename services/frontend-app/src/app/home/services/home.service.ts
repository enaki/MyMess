import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
      private readonly httpClient: HttpClient
  ) { }

  public getUserData(): Observable<HttpResponse<unknown>>{
    const data: UserModel = JSON.parse(sessionStorage.getItem('user'));
    const id = data.uid;
    return this.httpClient.get(
        `api/users/${id}`,
        {observe: 'response'}
    );
  }

  public getUserProfileData(): Observable<HttpResponse<unknown>>{
    const data: UserModel = JSON.parse(sessionStorage.getItem('user'));
    const id = data.uid;
    return this.httpClient.get(
        `api/user-profiles/${id}`,
        {observe: 'response'}
    );
  }
}
