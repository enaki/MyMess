import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<string>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string>('');
    const token = localStorage.getItem('userToken');
    console.log('UserService Constructor: ' + token);
    if (token != null){
      this.setToken(token);
    }
  }

  public getUserName(): void {
    let username = null;
    if (sessionStorage.getItem('identity') != null) {
      username = JSON.parse(
        sessionStorage.getItem('identity')
      ).username;
    }
    return username;
  }

  public setToken(token: string): void {
    if (token != null){
      localStorage.setItem('userToken', token);
      const tokenData = jwt_decode(token) as any;
      console.log(tokenData);
      const user: UserModel = {
        uid: tokenData.uid,
        username: tokenData.userName,
        firstname: tokenData.firstName,
        lastname: tokenData.lastName,
        email: tokenData.email,
        avatarPath: tokenData.avatarPath,
        dataRegistered: tokenData.dataRegistered,
        gender: tokenData.gender,
        birthdate: tokenData.birthdate,
        country: tokenData.country,
        city: tokenData.city,
        status: tokenData.status,
        roles: tokenData.roles
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.tokenSubject.next(token);
    } else {
      this.localStorageCleaning();
    }
  }

  public get token(): Observable<string>{
    return this.tokenSubject.asObservable();
  }

  public getUserDetails(): UserModel{
    const data = localStorage.getItem('user');
    return (data == null) ? null : JSON.parse(data);
  }

  public localStorageCleaning(): void {
    this.tokenSubject.next(null);
    console.log('Local Storage cleaned successfully');
    localStorage.clear();
  }

  public getHttpOptions(): any{
    if (this.tokenSubject.value != null){
      console.log(this.tokenSubject.value);
      return { headers: new HttpHeaders({'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(this.tokenSubject.value)}` })};
    } else {
      return { headers: new HttpHeaders({'Content-Type': 'application/json' })};
    }
  }
}
