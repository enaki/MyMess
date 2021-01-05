import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FriendListModel} from '../models/friend-list.model';
import {Observable} from 'rxjs';
import {BasicUserModel} from '../models/basic-user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  public friendsEndpoint = 'http://localhost:2020/api/friends';
  public userEndpoint = 'http://localhost:2020/api/users';

  constructor(private readonly http: HttpClient) {
  }

  public getFriendsIds(uid: string): Observable<FriendListModel>{
    return this.http.get<FriendListModel>(`${this.friendsEndpoint}/${uid}?toList=true`);
  }

  public getFriendInfo(friendId: string): Observable<BasicUserModel>{
    return this.http.get<BasicUserModel>(`${this.userEndpoint}/${friendId}`);
  }
}
