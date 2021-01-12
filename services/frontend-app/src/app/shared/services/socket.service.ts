import { Injectable } from '@angular/core';

import {io, Socket} from 'socket.io-client';
import {BehaviorSubject, Observable} from 'rxjs';

const SOCKET_ENDPOINT = 'localhost:2021';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socketSubject: BehaviorSubject<Socket>;

  constructor() {
    this.socketSubject = new BehaviorSubject<Socket>(null);
  }

  setupSocketConnection(): void {
    this.socketSubject.next(io(SOCKET_ENDPOINT));
  }

  setupSocketDisconnect(): void {
    console.log('Socket Disconnected');
    if (this.socketSubject.value !== null){
      this.socketSubject.value.disconnect();
      this.socketSubject.value.close();
      this.socketSubject.next(null);
    }
  }

  public get socket(): Observable<Socket>{
    return this.socketSubject.asObservable();
  }

}
