import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FriendsComponent} from './friends/friends.component';

const routes: Routes = [
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
