import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicUserModel} from '../../shared/models/basic-user.model';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  public userEndpoint = '/api/users';

  constructor(private readonly http: HttpClient
  ) {
  }

  public getPeople(uid: string): Observable<BasicUserModel[]> {
    return this.http.get<BasicUserModel[]>(`${this.userEndpoint}/unknown/${uid}`);
  }
}
