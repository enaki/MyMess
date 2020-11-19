import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //{ path: 'heroes', component:  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'friends', component: FriendsComponent }
  //{ path: 'detail/:id', component:  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
