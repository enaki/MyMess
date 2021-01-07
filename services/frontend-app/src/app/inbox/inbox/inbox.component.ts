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
import {io} from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:2021';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, AfterViewChecked, OnDestroy {
  contacts: BasicUserModel[];
  selectedUser: BasicUserModel;
  messages = {};
  moment;
  inputText: string;
  chatId: string;
  basicUserDetails: BasicUserModel;
  socket;

  constructor(
    private router: Router,
    private userService: UserService,
    private friendService: FriendService,
    private inboxService: InboxService
  ) {
    this.moment = moment;
    const user = this.userService.getUserDetails();
    if (user == null) {
      this.router.navigate(['login']);
    }
  }

  setupSocketConnection(): void {
    this.socket = io(SOCKET_ENDPOINT);
  }

  setupSocketDisconnect(): void {
    this.socket.disconnect();
    this.socket.close();
  }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.socketHandler();

    this.basicUserDetails = this.userService.getBasicUserDetails();
    console.log(this.basicUserDetails);
    this.friendService.getFriendsIds(this.basicUserDetails.uid).toPromise().then((data: FriendListModel) => {
      this.contacts = [];
      for (const friendId of data.friendList) {
        let firstFriend = false;
        this.friendService.getFriendInfo(friendId).toPromise().then((basicUserModel: BasicUserModel) => {
          // console.log(basicUserModel);
          this.contacts.push(basicUserModel);
          if (!firstFriend){
            console.log('[ngOnInit] Establish connection with friend');
            this.selectedUser = this.contacts[0];
            this.establishConnectionWithFriend();
            firstFriend = true;
          }
        });
      }
    });
  }

  establishConnectionWithFriend(): void{
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
    }
  }

  socketHandler(): void{
    this.socket.on('user-connected', (data: any) => {
        console.log(data);
    });
    this.socket.on('receive-chat-message', (message: any) => {
      console.log('Received a message from ' + message.ownerId);
      console.log(message);
      if (message.ownerId === this.selectedUser.uid){
        this.messages[this.selectedUser.uid].push(message);
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

  onInputChange(text: string): void {
    this.inputText = text;
  }

  ngOnDestroy(): void {
    this.setupSocketDisconnect();
  }
}
