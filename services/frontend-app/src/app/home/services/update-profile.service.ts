import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(
      private readonly httpClient: HttpClient
  ) {
  }

  public postUserProfileUpdate(id: string, data: any): Observable<HttpResponse<unknown>>{
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
}
