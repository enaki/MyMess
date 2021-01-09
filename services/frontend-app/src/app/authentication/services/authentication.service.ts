import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {LoginModel} from '../models/login.model';
import {Observable} from 'rxjs';
import {RegisterModel} from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
      private readonly httpClient: HttpClient
  ) {}

  public login(data: LoginModel): Observable<HttpResponse<unknown>>{
    return this.httpClient.post(
        'http://localhost:2020/auth/signIn',
        data,
        {observe: 'response'}
    );
  }

  public register(data: RegisterModel): Observable<HttpResponse<unknown>>{
    return this.httpClient.post(
        '/api/users',
        data,
        {observe: 'response'}
    );
  }
}
