import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FriendRequestModel} from '../models/friend-request.model';
import {FriendRequestsListModel} from '../models/requests-list.model';

@Injectable({
  providedIn: 'root'
})

export class FriendRequestsService {
  public friendsEndpoint = '/api/friends';

  constructor(private readonly http: HttpClient) {
  }

  public getFriendRequests(userId: string): Observable<FriendRequestModel[]> {
    return this.http.get<FriendRequestModel[]>(`${this.friendsEndpoint}/friend-requests/${userId}`);
  }

  public getSentFriendRequests(uid: string): Observable<FriendRequestsListModel> {
    return this.http.get<FriendRequestsListModel>(`${this.friendsEndpoint}/${uid}/sent-friend-requests`);
  }

  public sendRequest(userId: string, friendId: string): Observable<{}> {
    return this.http.post(`${this.friendsEndpoint}/request/${userId}?target=${friendId}`, null);
  }

  public acceptRequest(userId: string, friendId: string): Observable<{}> {
    return this.http.post(`${this.friendsEndpoint}/accept-request/${userId}?sender=${friendId}`, null);
  }

  public refuseRequest(userId: string, friendId: string): Observable<{}> {
    return this.http.delete(`${this.friendsEndpoint}/refuse-request/${userId}?sender=${friendId}`);
  }
}
