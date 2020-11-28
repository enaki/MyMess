import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotificationsComponent} from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotificationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
