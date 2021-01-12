import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FriendsRoutingModule} from './friends-routing.module';
import {AddFriendsComponent} from './friends-add/friends-add.component';
import {FriendsComponent} from './friends/friends.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AddFriendsComponent,
    FriendsComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatCardModule,
    FormsModule,
  ],
  exports: [
    AddFriendsComponent,
    FriendsComponent]
})
export class FriendsModule {
}
