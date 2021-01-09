import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageModel} from '../models/message.model';
import {IdModel} from '../../shared/models/id.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  public chatEndpoint = '/api/chat';

  constructor(private readonly http: HttpClient
  ) {
  }

  public getMessages(chatId: string): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.chatEndpoint}/${chatId}`);
  }

  public getChatId(uid1: string, uid2: string): Observable<IdModel> {
    return this.http.get<IdModel>(`${this.chatEndpoint}?uid1=${uid1}&uid2=${uid2}`);
  }
}
