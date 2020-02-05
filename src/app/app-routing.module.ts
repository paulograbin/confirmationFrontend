import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from './components/home/home.component';
import {ViewUserComponent} from './components/view-registration/view-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {ListEventsComponent} from './components/list-events/list-events.component';
import {ViewEventComponent} from './components/view-event/view-event.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth.guard';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: ListEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: ListEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'user/view/:id',
    component: ViewUserComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'event/view/:id',
    component: ViewEventComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: ListUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
