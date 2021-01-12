import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FriendsComponent} from './friends/friends.component';
import {AddFriendsComponent} from './friends-add/friends-add.component';

const routes: Routes = [
  {
    path: 'find',
    pathMatch: 'full',
    component: AddFriendsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: FriendsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
