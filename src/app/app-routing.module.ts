import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallbackComponent} from './components/callback/callback.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ViewUserComponent } from './components/view-registration/view-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {ListEventsComponent} from './components/list-events/list-events.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user/view/:id',
    component: ViewUserComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'users',
    component: ListUsersComponent
  },
  {
    path: 'events',
    component: ListEventsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
