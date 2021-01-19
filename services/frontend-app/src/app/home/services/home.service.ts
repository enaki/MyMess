import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
      private readonly httpClient: HttpClient
  ) { }

  public capitalizeKeys(obj: any): any{
    Object.keys(obj).forEach((key) => {
      let temp;
      if (obj.hasOwnProperty(key)) {
        temp = obj[key];
        delete obj[key];
        obj[key.charAt(0).toUpperCase() + key.substring(1)] = temp;
      }
    });
    return obj;
  }

  public getUserData(id: string): Observable<HttpResponse<unknown>>{
    return this.httpClient.get(
        `api/users/${id}`,
        {observe: 'response'}
    );
  }

  public getUserProfileData(id: string): Observable<HttpResponse<unknown>>{
    return this.httpClient.get(
        `api/user-profiles/${id}`,
        {observe: 'response'}
    );
  }
}
