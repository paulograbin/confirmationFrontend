import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ViewUserComponent} from './components/view-registration/view-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {ListEventsComponent} from './components/list-events/list-events.component';
import {ViewEventComponent} from './components/view-event/view-event.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth.guard';
import {LogoutComponent} from './logout/logout.component';
import {ListCreatedEventsComponent} from './components/list-created-events/list-created-events.component';
import {LoggedUserResolverService} from './services/logged-user-resolver.service';
import {EventResolverService} from './services/event-resolver.service';
import {EventRouterComponent} from './event-router/event-router.component';

const routes: Routes = [
  {
    path: '',
    component: EventRouterComponent,
    canActivate: [AuthGuard],
    resolve: {
      loggedUser: LoggedUserResolverService
    }
  },
  {
    path: 'events',
    component: ListEventsComponent,
    canActivate: [AuthGuard],
    resolve: {
      loggedUser: LoggedUserResolverService
    }
  },
  {
    path: 'createdEvents',
    component: ListCreatedEventsComponent,
    canActivate: [AuthGuard],
    resolve: {
      loggedUser: LoggedUserResolverService
    }
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
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event/view/:id',
    component: ViewEventComponent,
    canActivate: [AuthGuard],
    resolve: {
      resolvedEvent: EventResolverService,
      loggedUser: LoggedUserResolverService
    }
  },
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [AuthGuard]
  }
];

// TODO: don't user access events created by other MC

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
