import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

/**
 * Const routes declares the path and the corresponding components.
 * the loadChildren() method allows the app to lazy load the components.
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authentication',
  },
  {
    path: 'authentication',
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
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
        import('./profile/profile.module').then(
            (m) => m.ProfileModule
        ),
    canActivate: [AuthGuard]
  },
  {
    path: 'inbox',
    loadChildren: () =>
        import('./inbox/inbox.module').then(
            (m) => m.InboxModule
        ),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () =>
        import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule
        ),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
