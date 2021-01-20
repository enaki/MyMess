import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FriendsRoutingModule} from './friends-routing.module';
import {FriendsComponent} from './friends/friends.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FriendsComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatCardModule,
    FormsModule,
  ]
})
export class FriendsModule {
}
