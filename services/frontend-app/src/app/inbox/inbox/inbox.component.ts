import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services';
import {FriendService} from '../../shared/services';
import {Router} from '@angular/router';
import {FriendListModel} from '../../shared/models/friend-list.model';
import {BasicUserModel} from '../../shared/models/basic-user.model';
import {InboxService} from '../services/inbox.service';
import {IdModel} from '../../shared/models/id.model';
import {MessageModel} from '../models/message.model';
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
    private inboxService: InboxService
  ) {
    this.moment = moment;
    const user = this.userService.getUserDetails();
    if (user == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.basicUserDetails = this.userService.getBasicUserDetails();
    this.friendService.getFriendsIds('3').subscribe((data: FriendListModel) => {
      this.contacts = [];
      for (const friendId of data.friendList) {

        this.friendService.getFriendInfo(friendId).subscribe((basicUserModel: BasicUserModel) => {
          // console.log(basicUserModel);
          this.contacts.push(basicUserModel);
          this.selectedUser = this.contacts[0];
          this.inboxService.getChatId('2', '3').subscribe((idModel: IdModel) => {
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
      this.inboxService.getChatId('2', '3').subscribe((idModel: IdModel) => {
        this.chatId = idModel.id;
        this.inboxService.getMessages(idModel.id).subscribe((messageList: MessageModel[]) => {

        });
      });
    }
  }

  sendMessage(): void {
    if (this.inputText !== undefined && this.inputText.length > 0) {
      // to do de trimis mesajul
      const a = {
        messageId: 0,
        chatId: this.chatId,
        ownerId: '2',
        replyToMessageId: null,
        text: this.inputText,
        imagePath: null,
        date: this.moment.today
      };
      console.log(a);
      this.inputText = '';
    }
  }

  onInputChange(text: string): void {
    this.inputText = text;
  }
}
