import {Component, OnInit, AfterViewChecked, OnDestroy} from '@angular/core';
import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {FriendListModel} from '../../shared/models/friend-list.model';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {InboxService} from '../services/inbox.service';
import {IdModel} from '../../shared/models/id.model';
import {MessageModel} from '../models/message.model';
import * as moment from 'moment';
import {io, Socket} from 'socket.io-client';
import {SocketService} from '../../shared/services/socket.service';
import {Subscription} from 'rxjs';

const SOCKET_ENDPOINT = 'localhost:2021';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, AfterViewChecked, OnDestroy {
  contacts: BasicUserModel[];
  contactsIds: FriendListModel;
  pairUidContactIdx = {};
  selectedUser: BasicUserModel;
  messages = {};
  moment;
  inputText: string;
  searchText: string;
  chatId: string;
  typingFriends = [];
  notificationFriends = [];
  basicUserDetails: BasicUserModel;
  socket: Socket;
  private subs: Subscription[];
  firstFriend = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private friendService: FriendService,
    private inboxService: InboxService,
    private socketService: SocketService,
  ) {
    this.subs = new Array<Subscription>();
    this.moment = moment;
    const user = this.userService.getUserDetails();
    if (user == null) {
      this.router.navigate(['login']);
    }
    this.searchText = '';
    this.subs.push(this.socketService.socket.subscribe((socket) => {
      this.socket = socket;
      if (socket != null) {
        this.socketHandler();
      }
    }));
  }

  ngOnInit(): void {
    // this.setupSocketConnection();
    //if (this.socket !== null) {
    //this.socketHandler();
    //}
    this.basicUserDetails = this.userService.getBasicUserDetails();
    console.log(this.basicUserDetails);
    this.friendService.getFriendsIds(this.basicUserDetails.uid).toPromise().then((data: FriendListModel) => {
      this.contactsIds = data;
      this.contacts = [];
      const friendInfoPromises = data.friendList.map(friendId => this.friendService.getFriendInfo(friendId).toPromise());
      this.firstFriend = false;
      friendInfoPromises.forEach(friendInfoPromise => {
        friendInfoPromise.then((basicUserModel: BasicUserModel) => {
          // console.log(basicUserModel);
          basicUserModel.status = -1;
          this.contacts.push(basicUserModel);
          this.pairUidContactIdx[basicUserModel.uid] = this.contacts.length - 1;
          this.notificationFriends.push(false);
          if (!this.firstFriend) {
            console.log('[ngOnInit] Establish connection with friend');
            this.selectedUser = this.contacts[0];
            this.establishConnectionWithFriend();
            this.firstFriend = true;
          }
        });
      });
      Promise.all(friendInfoPromises).then(() => {
          console.log('[ngOnInit] All friendInfo Promises solved');
          this.socket.emit('friend-ids', this.contactsIds);
          this.socket.emit('send-message-notifications', this.basicUserDetails.uid);
        }
      );
    });
  }

  establishConnectionWithFriend(): void {
    this.inboxService.getChatId(this.basicUserDetails.uid, this.selectedUser.uid).toPromise().then((idModel: IdModel) => {
      this.chatId = idModel.id;
      const connection = {
        uid: this.basicUserDetails.uid,
        friendId: this.selectedUser.uid,
        username: this.basicUserDetails.username,
        friendName: this.selectedUser.username,
      };
      this.socket.emit('establish-connection', connection);
      this.inboxService.getMessages(idModel.id).toPromise().then((messageList: MessageModel[]) => {
        this.messages[this.selectedUser.uid] = messageList;
      });
    });
  }

  changeChat(id: string): void {
    this.socket.emit('message-notification-clear', this.selectedUser.uid);
    console.log('Change chat');
    // this.setupSocketDisconnect();
    // this.setupSocketConnection();
    // console.log(this.basicUserDetails);
    if (this.selectedUser.uid !== id) {
      this.inputText = '';
      for (let i = 0; i < this.contacts.length; ++i) {
        if (this.contacts[i].uid === id) {
          this.selectedUser = this.contacts[i];
          break;
        }
      }
      this.establishConnectionWithFriend();
      if (this.notificationFriends[this.pairUidContactIdx[this.selectedUser.uid]]) {
        this.socket.emit('message-notification-clear', this.selectedUser.uid);
        this.notificationFriends[this.pairUidContactIdx[this.selectedUser.uid]] = false;
      }
    }
  }

  socketHandler(): void {
    console.log('SOCKET HANDLER CALLED');
    this.socket.on('user-connected', (data: any) => {
      console.log('User ' + data.uid + ' just connected.');
      const indexContact = this.pairUidContactIdx[data.uid];
      if (indexContact !== undefined) {
        this.contacts[indexContact].status = 0;
      }
    });
    this.socket.on('message-notifications', (data: any) => {
      console.log(this.selectedUser.uid);
      for (const id of data) {
        if (id !== this.selectedUser.uid) {
          this.notificationFriends[this.pairUidContactIdx[id]] = true;
        } else {
          this.socket.emit('message-notification-clear', this.selectedUser.uid);
        }
      }
    });
    this.socket.on('receive-is-typing', (data: any) => {
      this.typingFriends.push(data);
    });
    this.socket.on('receive-stop-typing', (data: any) => {
      const index = this.typingFriends.indexOf(data);
      if (index > -1) {
        this.typingFriends.splice(index, 1);
      }
    });
    this.socket.on('user-disconnected', (data: any) => {
      console.log('User ' + data.uid + ' just disconnected.');
      const indexContact = this.pairUidContactIdx[data.uid];
      if (indexContact !== undefined) {
        this.contacts[indexContact].status = moment().unix();
      }
    });
    this.socket.on('take-friends-status', (data: any) => {
      // console.log(data);
      // console.log(this.contacts);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const contactIndex = this.pairUidContactIdx[key];
          console.log(key + ' - ' + data[key] + ' - ' + contactIndex);
          if (this.contacts[contactIndex] !== undefined) {
            this.contacts[contactIndex].status = data[key];
          }
        }
      }
    });
    this.socket.on('receive-chat-message', (message: any) => {
      console.log('Received a message from ' + message.ownerId);
      console.log(message);
      if (message.ownerId === this.selectedUser.uid) {
        this.messages[this.selectedUser.uid].push(message);
      } else {
        this.notificationFriends[this.pairUidContactIdx[message.ownerId]] = true;
      }
    });
  }

  sendMessage(): void {
    while (this.inputText[0] === '\n') {
      this.inputText = this.inputText.substring(1);
    }
    console.log(this.inputText);
    if (this.inputText !== undefined && this.inputText.length > 0) {
      // to do de trimis mesajul
      const message = {
        messageId: 0,
        chatId: this.chatId,
        ownerId: this.basicUserDetails.uid,
        replyToMessageId: null,
        text: this.inputText,
        imagePath: null,
        date: this.moment.today
      };
      if(this.messages[this.selectedUser.uid] === undefined){
        this.messages[this.selectedUser.uid] = [];
      }
      this.messages[this.selectedUser.uid].push(message);
      this.inputText = '';
      this.socket.emit('send-chat-message', message);
    }
  }

  // tslint:disable-next-line:typedef
  ngAfterViewChecked() {
    try {
      const container = document.getElementById('message_box');
      container.scrollTop = container.scrollHeight;
    } catch (e) {
    }
  }

  notifyIsTyping(): void {
    this.socket.emit('notify-is-typing', {id: this.basicUserDetails.uid, friendId: this.selectedUser.uid});
  }

  notifyStopTyping(): void {
    this.socket.emit('notify-stop-typing', {id: this.basicUserDetails.uid, friendId: this.selectedUser.uid});
  }

  ngOnDestroy(): void {
    // this.setupSocketDisconnect();
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
