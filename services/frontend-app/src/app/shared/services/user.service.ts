import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {UserModel} from '../models/user.model';
import {BasicUserModel} from '../models/basic-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<string>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string>('');
    const token = sessionStorage.getItem('userToken');
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
      sessionStorage.setItem('userToken', token);
      const tokenData = jwt_decode(token) as any;
      const user: UserModel = {
        uid: tokenData.uid,
        username: tokenData.username,
        firstname: tokenData.firstname,
        lastname: tokenData.lastname,
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
      sessionStorage.setItem('user', JSON.stringify(user));
      this.tokenSubject.next(token);
    } else {
      this.sessionStorageCleaning();
    }
  }

  public get token(): Observable<string>{
    return this.tokenSubject.asObservable();
  }

  public getUserDetails(): UserModel{
    const data = sessionStorage.getItem('user');
    return (data == null) ? null : JSON.parse(data);
  }

  public updateUserDetails(user: BasicUserModel): Promise<void>{
    return new Promise(() => {
      const data = sessionStorage.getItem('user');
      const parsedData: UserModel = JSON.parse(data);
      parsedData.uid = user.uid;
      parsedData.username = user.username;
      parsedData.firstname = user.firstName;
      parsedData.lastname = user.lastName;
      parsedData.email = user.email;
      parsedData.avatarPath = user.avatarLink;
      sessionStorage.removeItem('user');
      sessionStorage.setItem('user', JSON.stringify(parsedData));
    });
  }

  public updateUserAvatarLink(avatarLink: string): Promise<void>{
    return new Promise(() => {
      const data = sessionStorage.getItem('user');
      const parsedData: UserModel = JSON.parse(data);
      parsedData.avatarPath = avatarLink;
      sessionStorage.removeItem('user');
      sessionStorage.setItem('user', JSON.stringify(parsedData));
    });
  }

  public getBasicUserDetails(): BasicUserModel{
    const data = sessionStorage.getItem('user');
    if (data == null){
      return null;
    }
    else{
      // console.log(data);
      const parsedData: UserModel = JSON.parse(data);
      return {
        uid: parsedData.uid,
        username: parsedData.username,
        firstName: parsedData.firstname,
        lastName: parsedData.lastname,
        email: parsedData.email,
        avatarLink: parsedData.avatarPath,
        status: -1,
      };
    }
  }

  public sessionStorageCleaning(): void {
    this.tokenSubject.next(null);
    console.log('Local Storage cleaned successfully');
    sessionStorage.clear();
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
