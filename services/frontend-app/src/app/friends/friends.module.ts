import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FriendsRoutingModule} from './friends-routing.module';
import {FriendsComponent} from './friends/friends.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    FriendsComponent],
    imports: [
        CommonModule,
        FriendsRoutingModule,
        MatCardModule,
        FormsModule,
        SharedModule,
    ]
})
export class FriendsModule {
}
