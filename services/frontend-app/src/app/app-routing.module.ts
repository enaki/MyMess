import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Const routes declares the path and the corresponding components.
 * the loadChildren() method allows the app to lazy load the components.
 */
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'friends',
    loadChildren: () =>
      import('./friends/friends.module').then(
        (m) => m.FriendsModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'inbox',
    loadChildren: () =>
      import('./inbox/inbox.module').then(
        (m) => m.InboxModule
      ),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        (m) => m.NotificationsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
