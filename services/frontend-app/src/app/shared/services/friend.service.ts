import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FriendListModel} from '../models/friend-list.model';
import {Observable} from 'rxjs';
import {BasicUserModel} from '../models/basic-user.model';

@Injectable({
  providedIn: 'root'
})

export class FriendService {
  public friendsEndpoint = '/api/friends';
  public userEndpoint = '/api/users';

  constructor(private readonly http: HttpClient) {
  }

  public getFriendsIds(uid: string): Observable<FriendListModel> {
    return this.http.get<FriendListModel>(`${this.friendsEndpoint}/${uid}?toList=true`);
  }

  public getFriendInfo(friendId: string): Observable<BasicUserModel> {
    return this.http.get<BasicUserModel>(`${this.userEndpoint}/${friendId}`);
  }

  public blockFriend(userId: string, friendId: string): Observable<{}> {
    return this.http.post(`${this.friendsEndpoint}/block/${userId}?blockedId=${friendId}`, null);
  }

  public deleteFriend(userId: string, friendId: string): Observable<{}> {
    return this.http.delete(`${this.friendsEndpoint}/${userId}?removeId=${friendId}`);
  }
}
