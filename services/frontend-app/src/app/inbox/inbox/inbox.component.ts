import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {FriendListModel} from '../../shared/models/friend-list.model';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {InboxService} from '../services/inbox.service';
import {IdModel} from '../../shared/models/id.model';
import {MessageModel} from '../models/message.model';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  contacts: BasicUserModel[];
  selectedUser: BasicUserModel;
  messages = {};
  moment;
  inputText: string;
  chatId: string;
  basicUserDetails: BasicUserModel;

  constructor(
    private router: Router,
    private userService: UserService,
    private friendService: FriendService,
    private inboxService: InboxService,
    private socket: Socket
  ) {
    this.moment = moment;
    const user = this.userService.getUserDetails();
    if (user == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.basicUserDetails = this.userService.getBasicUserDetails();
    this.friendService.getFriendsIds(this.basicUserDetails.uid).subscribe((data: FriendListModel) => {
      this.contacts = [];
      for (const friendId of data.friendList) {

        this.friendService.getFriendInfo(friendId).subscribe((basicUserModel: BasicUserModel) => {
          // console.log(basicUserModel);
          this.contacts.push(basicUserModel);
          this.selectedUser = this.contacts[0];
          this.inboxService.getChatId(this.basicUserDetails.uid, this.selectedUser.uid).subscribe((idModel: IdModel) => {
            this.chatId = idModel.id;
            this.inboxService.getMessages(idModel.id).subscribe((messageList: MessageModel[]) => {
              this.messages[basicUserModel.uid] = messageList;
            });
          });
        });
      }
    });
  }

  changeChat(id: string): void {
    console.log(this.basicUserDetails);
    if (this.selectedUser.uid !== id) {
      this.inputText = '';
      for (let i = 0; i < this.contacts.length; ++i) {
        if (this.contacts[i].uid === id) {
          this.selectedUser = this.contacts[i];
          break;
        }
      }
      this.inboxService.getChatId(this.basicUserDetails.uid, this.selectedUser.uid).subscribe((idModel: IdModel) => {
        this.chatId = idModel.id;
        const connection = {
          uid: this.basicUserDetails.uid,
          friendId: this.selectedUser.uid,
        };

        // this.socket.emit('establish-connection', connection);

        this.inboxService.getMessages(idModel.id).subscribe((messageList: MessageModel[]) => {

        });
      });
    }
  }

  sendMessage(): void {
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

      // this.socket.emit('message', JSON.stringify(message));
    }
  }

  onInputChange(text: string): void {
    this.inputText = text;
  }
}
